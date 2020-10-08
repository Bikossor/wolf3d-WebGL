export const DEG2RAD = (a: number) => a * 0.01745329251994329576; // a * M_PI / 180.0f
export const RAD2DEG = (a: number) => a / 0.01745329251994329576; // a * 180.0f / M_PI 
export const ANGLE2SHORT = (x: number) => ((x * 65536 / 360) >> 0) & 65535;
export const SHORT2ANGLE = (x: number) => x * 360.0 / 65536;

/**
 * @description Finds the difference between two angles.
 * @memberOf Wolf.Angle
 * @param angle1 Angle in radians.
 * @param angle2 Angle in radians.
 * @returns The absolute difference between two angles, this will always be between 0 and 180 degrees.
 */
export const diff = (angle1: number, angle2: number) => {
    var diff: number;

    if (angle1 > angle2) {
        diff = angle1 - angle2;
    } else {
        diff = angle2 - angle1;
    }

    if (diff > Math.PI) {
        return 2 * Math.PI - diff;
    } else {
        return diff;
    }
}

/**
 * @description Clockwise distance between two angles.
 * @memberOf Wolf.Angle
 * @param angle1 Angle in radians.
 * @param angle2 Angle in radians.
 * @returns The clockwise distance from angle2 to angle1, this may be greater than 180 degrees.
 */
export const distCW = (angle1: number, angle2: number) => {
    if (angle1 > angle2) {
        return angle1 - angle2;
    } else {
        return angle1 + 2 * Math.PI - angle2;
    }
}

/**
 * @description Linear interpolate between angle from and to by fraction frac.
 * @memberOf Wolf.Angle
 * @param from Angle in radians.
 * @param to Angle in radians.
 * @param frac Fraction.
 */
export const interpolate = (from: number, to: number, frac: number) => {
    var d = diff(from, to) * frac;

    if (distCW(to, from) >= Math.PI) {
        return from - d;
    } else {
        return from + d;
    }
}

/**
 * @description Normalize angle.
 * @memberOf Wolf.Angle
 * @param {number} angle
 */
export const normalize = (angle: number) => {
    while (angle < 0) {
        angle += (2 * Math.PI);
    }
    while (angle >= (2 * Math.PI)) {
        angle -= (2 * Math.PI);
    }
    return angle;
}

/**
 * @description Linear interpolate allowing for the Modulo 360 problem.
 * @memberOf Wolf.Angle
 * @param {number} from Angle in radians.
 * @param {number} to Angle in radians.
 * @param {number} frac fraction.
 */
export const lerp = (from: number, to: number, frac: number) => {
    if (to - from > 180) {
        to -= 360;
    }
    if (to - from < -180) {
        to += 360;
    }
    return from + frac * (to - from);
}
