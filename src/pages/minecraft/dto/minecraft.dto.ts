import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PingMinecraftServerDto {
  @ApiProperty({
    description: 'Host',
    example: '192.168.0.105',
  })
  @IsNotEmpty()
  @IsString()
  host: string;

  @ApiProperty({
    description: 'Port',
    example: 25565,
  })
  @IsNotEmpty()
  @IsNumber()
  port: number;
}

export class ForgeData {
  @ApiProperty({
    description: 'Channels',
    example: [],
  })
  channels: string[];

  @ApiProperty({
    description: 'Mods',
    example: [],
  })
  mods: any[];

  @ApiProperty({
    description: 'Truncated',
    example: false,
  })
  truncated: boolean;

  @ApiProperty({
    description: 'FML network version',
    example: 0,
  })
  fmlNetworkVersion: number;

  /**
   * @deprecated mutred for a reason
   */
  // @ApiProperty({
  //   description: 'D (forge trash | useless)',
  //   example: '',
  // })
  // d: string;
}

export class Player {
  @ApiProperty({
    description: 'Id',
    example: '26e65ccf-97a8-36ca-a815-508066571c14',
  })
  id: string;

  @ApiProperty({
    description: 'Name',
    example: 'ibah',
  })
  name: string;
}

export class Players {
  @ApiProperty({
    description: 'Max players',
    example: 20,
  })
  max: number;

  @ApiProperty({
    description: 'Online players',
    example: 10,
  })
  online: number;

  @ApiProperty({
    description: 'Sample players',
    example: [{ id: '1234567890', name: 'John Doe' }],
  })
  sample?: Player[];
}

export class Version {
  @ApiProperty({
    description: 'Name',
    example: '1.20.1',
  })
  name: string;
  protocol: number;
}

export class Description {
  @ApiProperty({
    description: 'Text',
    example: 'A Minecraft server',
  })
  text: string;
}

export class NetResult {
  @ApiProperty({
    description: 'Forge data',
    example: {
      channels: ['1.20.1'],
      mods: [],
      truncated: false,
      fmlNetworkVersion: 0,
      d: '',
    },
  })
  forgeData: ForgeData;

  @ApiProperty({
    description: 'Description',
    example: { text: 'A Minecraft server' },
  })
  description: Description;

  @ApiProperty({
    description: 'Players',
    example: {
      max: 20,
      online: 10,
      sample: [{ id: '1234567890', name: 'John Doe' }],
    },
  })
  players: Players;

  @ApiProperty({
    description: 'Version',
    example: { name: '1.20.1', protocol: 758 },
  })
  version: Version;
}

export class PingMinecraftServerResponse {
  @ApiProperty({
    description: 'Result',
    example: {
      forgeData: {
        channels: ['1.20.1'],
        mods: [],
        truncated: false,
        fmlNetworkVersion: 0,
      },
      description: { text: 'A Minecraft server' },
      players: {
        max: 20,
        online: 10,
        sample: [{ id: '1234567890', name: 'John Doe' }],
      },
      version: { name: '1.20.1', protocol: 758 },
    },
  })
  result: NetResult;

  @ApiProperty({
    description: 'Time',
    example: '30005.63sec',
  })
  time: string;
}

export class GetIpResponce extends NetResult {
  @ApiProperty({
    description: 'Local ip',
    example: '192.168.*.***:25565',
  })
  @IsNotEmpty()
  @IsString()
  local_ip: string;

  @ApiProperty({
    description: 'Public ip',
    example: '**.**.**.**:25565',
  })
  @IsNotEmpty()
  @IsString()
  public_ip: string;

  @ApiProperty({
    description: 'Domain connect',
    example: 'ibahbalezin.ddns.net:25565',
  })
  @IsNotEmpty()
  @IsString()
  domain_connect: string;
}
