export const XRES: number = 608;
export const YRES: number = 304;
export const SLICE_WIDTH: number = 3;
export const WALL_TEXTURE_WIDTH: number = 64;
export const NUM_WALL_TEXTURES: number = 55;
export const HUD_FACE_WIDTH: number = 48;
export const HUD_FACE_HEIGHT: number = 64;
export const HUD_WEAPON_WIDTH: number = 256;

export const NUMAREAS: number = 37;   // number of areas
export const FIRSTAREA: number = 0x6B; // first area in map data (it is by the way a way to the secret floor!)
export const AMBUSHTILE: number = 0x6A; // def guard
export const AMBUSH: number = -2;

export const TILEGLOBAL: number = 0x10000;
export const HALFTILE: number = 0x8000;
export const TILESHIFT: number = 16;
export const MINDIST: number = 0x5800;
export const FLOATTILE: number = 65536.0;

export const TILE2POS = (a: number) => (a << TILESHIFT) + HALFTILE;
export const POS2TILE = (a: number) => a >> TILESHIFT;
export const POS2TILEf = (a: number) => a / FLOATTILE;

export const ASTEP: number = 0.0078125;    // 1 FINE=x DEGREES
export const ASTEPRAD: number = 0.000136354;  // 1 FINE=x RADIANS
export const ANG_1RAD: number = 7333.8598;    // 1 RADIAN=x FINES
export const ANG_0: number = 0;            //(int)((float)0/ASTEP)
export const ANG_1: number = 128;          //(int)((float)1/ASTEP)
export const ANG_6: number = 768;          //(int)((float)6/ASTEP)
export const ANG_15: number = 1920;         //(int)((float)15/ASTEP)
export const ANG_22_5: number = 2880;         //(int)((float)22.5/ASTEP)
export const ANG_30: number = 3840;         //(int)((float)30/ASTEP)
export const ANG_45: number = 5760;         //(int)((float)45/ASTEP)
export const ANG_67_5: number = 8640;         //(int)((float)67.5/ASTEP)
export const ANG_90: number = 11520;        //(int)((float)90/ASTEP)
export const ANG_112_5: number = 14400;        //(int)((float)112.5/ASTEP)
export const ANG_135: number = 17280;        //(int)((float)135/ASTEP)
export const ANG_157_5: number = 20160;        //(int)((float)157.5/ASTEP)
export const ANG_180: number = 23040;        //(int)((float)180/ASTEP)
export const ANG_202_5: number = 25920;        //(int)((float)202.5/ASTEP)
export const ANG_225: number = 28800;        //(int)((float)225/ASTEP)
export const ANG_247_5: number = 31680;        //(int)((float)247.5/ASTEP)
export const ANG_270: number = 34560;        //(int)((float)270/ASTEP)
export const ANG_292_5: number = 37440;        //(int)((float)292.5/ASTEP)
export const ANG_315: number = 40320;        //(int)((float)225/ASTEP)
export const ANG_337_5: number = 43200;        //(int)((float)337.5/ASTEP)
export const ANG_360: number = 46080;        //(int)((float)360/ASTEP)

export const ANGLES: number = 360; // must be divisable by 4
export const DEATHROTATE: number = 2;

export const FINE2RAD = (a: number) => (a * Math.PI / ANG_180);
export const RAD2FINE = (a: number) => (a * ANG_180 / Math.PI);
export const FINE2DEG = (a: number) => (a / ANG_1) >> 0;
export const FINE2DEGf = (a: number) => a / ANG_1;
export const DEG2FINE = (a: number) => a * ANG_1;
