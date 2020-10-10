let Wolf: any; // TODO (al) Remove in the future.

export const init = (
    level: { state: { areaconnect: number[][]; areabyplayer: boolean[]; }; },
    areanumber: string | number
) => {
    level.state.areaconnect = [];
    level.state.areabyplayer = [];
    for (var i = 0; i < Wolf.NUMAREAS; i++) {
        level.state.areaconnect[i] = [];
        for (var j = 0; j < Wolf.NUMAREAS; j++) {
            level.state.areaconnect[i][j] = 0;
        }
        level.state.areabyplayer[i] = false;
    }
    level.state.areabyplayer[areanumber] = true;
}


/**
 * @private
 * @description Scans outward from playerarea, marking all connected areas. 
 * @param {object} level The level object
 * @param {number} areanumber Area
 */
export const recursiveConnect = (
    level: { state: { areaconnect: number[][]; areabyplayer: boolean[]; }; },
    areanumber: number
) => {
    for (var i = 0; i < Wolf.NUMAREAS; ++i) {
        if (level.state.areaconnect[areanumber][i] && !level.state.areabyplayer[i]) {
            level.state.areabyplayer[i] = true;
            recursiveConnect(level, i);
        }
    }
}

/**
 * @description Connect area. 
 * @memberOf Wolf.Areas
 * @param {object} level The level object
 * @param {number} areanumber New area
 */
export const connect = (
    level: { state: { areaconnect: number[][]; areabyplayer: boolean[]; }; },
    areanumber: number
) => {
    var i: number, c = 0;

    if (areanumber >= Wolf.NUMAREAS) {
        throw new Error("areanumber >= Wolf.NUMAREAS");
    }

    level.state.areabyplayer = [];
    level.state.areabyplayer[areanumber] = true;

    recursiveConnect(level, areanumber);
    for (i = 0; i < Wolf.NUMAREAS; i++) {
        if (level.state.areabyplayer[i]) {
            c++;
        }
    }
}

/**
 * @description Join ares 
 * @memberOf Wolf.Areas
 * @param {object} level The level object
 * @param {number} area1 Area 1
 * @param {number} area2 Area 2
 */
export const join = (
    level: { state: { areaconnect: number[][]; areabyplayer: boolean[]; }; },
    area1: number, area2: number
) => {
    if (area1 < 0 || area1 >= Wolf.NUMAREAS) {
        throw new Error("area1 < 0 || area1 >= Wolf.NUMAREAS");
    }
    if (area2 < 0 || area2 >= Wolf.NUMAREAS) {
        throw new Error("area2 < 0 || area2 >= Wolf.NUMAREAS");
    }
    level.state.areaconnect[area1][area2]++;
    level.state.areaconnect[area2][area1]++;
}

/**
 * @description Disconnect ares 
 * @memberOf Wolf.Areas
 * @param {object} level The level object
 * @param {number} area1 Area 1
 * @param {number} area2 Area 2
 */
export const disconnect = (
    level: { state: { areaconnect: number[][]; areabyplayer: boolean[]; }; },
    area1: number,
    area2: number
) => {
    if (area1 < 0 || area1 >= Wolf.NUMAREAS) {
        throw new Error("area1 < 0 || area1 >= Wolf.NUMAREAS");
    }
    if (area2 < 0 || area2 >= Wolf.NUMAREAS) {
        throw new Error("area2 < 0 || area2 >= Wolf.NUMAREAS");
    }
    level.state.areaconnect[area1][area2]--;
    level.state.areaconnect[area2][area1]--;
}