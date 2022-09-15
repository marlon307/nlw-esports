"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converHourStringToMinutes = void 0;
function converHourStringToMinutes(hourString) {
    const [hours, minutes] = hourString.split(":").map(Number);
    const minutAmount = (hours * 60) + minutes;
    return minutAmount;
}
exports.converHourStringToMinutes = converHourStringToMinutes;
