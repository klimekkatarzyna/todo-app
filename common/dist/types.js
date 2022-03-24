"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Importance = exports.SortType = exports.ITaskStatus = void 0;
var ITaskStatus;
(function (ITaskStatus) {
    ITaskStatus["inComplete"] = "inComplete";
    ITaskStatus["complete"] = "complete";
})(ITaskStatus = exports.ITaskStatus || (exports.ITaskStatus = {}));
var SortType;
(function (SortType) {
    SortType[SortType["draggedItem"] = 0] = "draggedItem";
    SortType["createdAt"] = "createdAt";
    SortType[SortType["alphabetically"] = 2] = "alphabetically";
    SortType[SortType["deadline"] = 3] = "deadline";
    SortType[SortType["importance"] = 4] = "importance";
    SortType[SortType["addedToDayly"] = 5] = "addedToDayly";
})(SortType = exports.SortType || (exports.SortType = {}));
var Importance;
(function (Importance) {
    Importance["normal"] = "Normal";
    Importance["high"] = "High";
})(Importance = exports.Importance || (exports.Importance = {}));
