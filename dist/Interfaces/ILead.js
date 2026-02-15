"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadStatus = exports.LeadType = void 0;
var LeadType;
(function (LeadType) {
    LeadType["CONTACT"] = "CONTACT";
    LeadType["ROI"] = "ROI";
})(LeadType || (exports.LeadType = LeadType = {}));
var LeadStatus;
(function (LeadStatus) {
    LeadStatus["NEW"] = "NEW";
    LeadStatus["CONTACTED"] = "CONTACTED";
    LeadStatus["QUALIFIED"] = "QUALIFIED";
    LeadStatus["CLOSED"] = "CLOSED";
})(LeadStatus || (exports.LeadStatus = LeadStatus = {}));
