import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import ip from 'ip';
import util from 'util';
import net from 'net';
import {
  GetIpResponce,
  NetResult,
  PingMinecraftServerResponse,
} from 'src/pages/minecraft/dto/minecraft.dto';
import { minecraft_settings } from 'src/shared/json';
import { NODE_ENV } from 'src/shared/consts/node-env';
import { baseUrl } from 'src/shared/utils/axios-instance';

@Injectable()
export default class IpService {
  private readonly logger = new Logger(IpService.name);

  writeVarInt(value: number) {
    const buffer = [];
    while (true) {
      if ((value & ~0x7f) === 0) {
        buffer.push(value);
        break;
      }
      buffer.push((value & 0x7f) | 0x80);
      value >>>= 7;
    }
    const bufferVarInt = Buffer.from(buffer);
    return bufferVarInt;
  }

  createHandshakePacket(host: string, port: number) {
    const hostBuffer = Buffer.from(host, 'utf-8');
    const portBuffer = Buffer.alloc(2);
    portBuffer.writeUInt16BE(port, 0);

    const packetId = Buffer.from([0x00]);
    const protocolVersion = this.writeVarInt(758); // 1.20.1 (поменяй при необходимости)
    const hostLength = this.writeVarInt(hostBuffer.length);

    const data = Buffer.concat([
      packetId,
      protocolVersion,
      hostLength,
      hostBuffer,
      portBuffer,
      Buffer.from([0x01]), // next state = status
    ]);

    const length = this.writeVarInt(data.length);
    const buffer = Buffer.concat([length, data]);
    return buffer;
  }

  createStatusRequestPacket() {
    const buffer = Buffer.from([0x01, 0x00]);
    return buffer;
  }

  readVarInt(buffer: Buffer, offset = 0): { value: number; size: number } {
    let numRead = 0;
    let result = 0;
    let read;
    do {
      read = buffer[offset + numRead];
      const value = read & 0b01111111;
      result |= value << (7 * numRead);

      numRead++;
      if (numRead > 5) {
        throw new Error('VarInt is too big');
      }
    } while ((read & 0b10000000) != 0);

    return { value: result, size: numRead };
  }

  public async pingMinecraftServer(
    host: string,
    port: number,
  ): Promise<PingMinecraftServerResponse> {
    this.logger.log(`Pinging minecraft server ${host}:${port}`);
    const start = performance.now();
    return new Promise((resolve, reject) => {
      const client = net.createConnection({ host, port }, () => {
        client.write(this.createHandshakePacket(host, port));
        client.write(this.createStatusRequestPacket());
      });

      let response = Buffer.alloc(0);

      client.on('data', (data) => {
        response = Buffer.concat([response, data]);

        try {
          const lengthInfo = this.readVarInt(response, 0);

          let offset = lengthInfo.size;

          const packetIdInfo = this.readVarInt(response, offset);
          offset += packetIdInfo.size;

          const jsonLengthInfo = this.readVarInt(response, offset);
          offset += jsonLengthInfo.size;

          const jsonString = response
            .slice(offset, offset + jsonLengthInfo.value)
            .toString('utf-8');
          const {
            forgeData: { channels, fmlNetworkVersion, mods, truncated },
            description,
            players,
            version,
          } = JSON.parse(jsonString) as NetResult;

          const result = {
            forgeData: {
              channels,
              mods,
              truncated,
              fmlNetworkVersion,
            },
            description,
            players,
            version,
          };

          const end = performance.now();

          resolve({
            result,
            time: `${(end - start).toFixed(2)}sec`,
          });
        } catch (e) {
          this.logger.error('Failed to parse Minecraft ping response', e);
          reject(e);
        }
      });

      client.on('error', (err) => {
        this.logger.error(
          `Error pinging minecraft server ${host}:${port}`,
          err,
        );
        reject(err);
      });
    });
  }

  public async getIp(): Promise<GetIpResponce | string> {
    try {
      const command = 'curl ip-adresim.app';
      const port = minecraft_settings.port;
      const execProm = util.promisify(exec);
      const public_ip =
        (await execProm(command)).stdout.replace('\n', '') + `:${port}`;
      const local_ip: string =
        NODE_ENV === 'production' ? baseUrl() : ip.address();

      const { result } = await this.pingMinecraftServer(
        local_ip,
        Number(minecraft_settings.port),
      );

      const domain_name = 'ibahbalezin.ddns.net';
      const data: GetIpResponce = {
        local_ip: `${local_ip}:${port}`,
        public_ip,
        domain_connect: `${domain_name}:${port}`,
        ...result,
      };
      return data;
    } catch (error) {
      this.logger.error('Failed to get ip', error);
      return 'Failed to get ip. Server probably shutdowned';
    }
  }
}
