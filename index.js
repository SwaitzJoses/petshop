var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var availability = /** @class */ (function () {
    function availability() {
        this.pet = [];
    }
    availability.prototype.insertPetData = function (petName, adopted, type) {
        this.pet.push({ petName: petName, adopted: adopted, type: type, id: this.pet.length + 1 });
    };
    availability.prototype.getPetData = function () {
        return this.pet;
    };
    availability.prototype.updatePetData = function (petType) {
        var index = instance
            .getPetData()
            .findIndex(function (el) { return el.adopted === "N" && el.type === petType; });
        if (index >= 0) {
            this.pet[index].adopted = "Y";
        }
        else {
            console.log("No " + petType + " available");
        }
    };
    return availability;
}());
var requestClass = /** @class */ (function (_super) {
    __extends(requestClass, _super);
    function requestClass() {
        var _this = _super.call(this) || this;
        _this.enquiry = [];
        _this.count = {};
        return _this;
    }
    requestClass.prototype.insertEnquiryData = function (guardian, petType) {
        this.enquiry.push({
            guardian: guardian,
            petType: petType,
            id: this.enquiry.length + 1,
            status: "OPEN"
        });
    };
    requestClass.prototype.getDataFromAnimal = function () {
        return this.pet;
    };
    requestClass.prototype.getEnquiryData = function () {
        return this.enquiry;
    };
    requestClass.prototype.resetCount = function () {
        this.count = {};
    };
    requestClass.prototype.getInventoryData = function () {
        this.resetCount();
        var source = this.getPetData().filter(function (e) { return e.adopted === "N"; });
        for (var i = 0; i < source.length; i++) {
            if (this.count[source[i].type] >= 0) {
                this.count[source[i].type] = this.count[source[i].type] + 1;
            }
            else {
                this.count[source[i].type] = 1;
            }
        }
        return this.count;
    };
    requestClass.prototype.getAvailableStatusForTop5 = function () {
        var filteredValues = this.enquiry.filter(function (e) { return e.status === "OPEN"; });
        this.getInventoryData();
        var countReplicate = __assign({}, this.count);
        var possible = [];
        var length = filteredValues.length;
        if (length > 5) {
            length = 5;
        }
        for (var i = 0; i < length; i++) {
            if (countReplicate[filteredValues[i].petType] > 0) {
                //  Object.assign({},this.enquiry[i],{status='CLOSED'})
                // let index = instancfilteredValues[i].getEnquiryData().findIndex(el=>el.id==filteredValues[i].id)
                // this.enquiry[index].status='CLOSED'
                countReplicate[filteredValues[i].petType] =
                    countReplicate[filteredValues[i].petType] - 1;
                possible.push({
                    guardian: filteredValues[i].guardian,
                    petType: filteredValues[i].petType,
                    id: filteredValues[i].id,
                    requestFulFilment: "Y"
                });
            }
            else {
                possible.push({
                    guardian: filteredValues[i].guardian,
                    petType: filteredValues[i].petType,
                    id: filteredValues[i].id,
                    requestFulFilment: "N"
                });
            }
        }
        return possible;
    };
    requestClass.prototype.decrementInventory = function (petType) {
        this.updatePetData(petType);
        this.getInventoryData();
    };
    requestClass.prototype.sellForTop5 = function () {
        var filteredVals = this.getAvailableStatusForTop5().filter(function (e) { return e.requestFulFilment === "Y"; });
        var _loop_1 = function (i) {
            //  Object.assign({},this.enquiry[i],{status='CLOSED'})
            // let index = instancfilteredVals[i].getEnquiryData().findIndex(el=>el.id==filteredVals[i].id)
            // this.enquiry[index].status='CLOSED'
            var index = instance
                .getEnquiryData()
                .findIndex(function (el) { return el.id === filteredVals[i].id; });
            this_1.enquiry[index].status = "CLOSED";
            this_1.decrementInventory(filteredVals[i].petType);
        };
        var this_1 = this;
        // let countReplicate = {...this.count}
        for (var i = 0; i < filteredVals.length; i++) {
            _loop_1(i);
        }
        return this.count;
    };
    return requestClass;
}(availability));
var instance = new requestClass();
instance.insertPetData("S", "Y", "Dog");
instance.insertPetData("S", "N", "Dog");
instance.insertPetData("S", "N", "Dog");
instance.insertPetData("S", "N", "Dog");
instance.insertPetData("S", "Y", "Dog");
instance.insertPetData("H", "N", "Cat");
instance.insertEnquiryData("Arun", "Dog");
instance.insertEnquiryData("Arun", "Cat");
instance.insertEnquiryData("Arun", "Dog");
instance.insertEnquiryData("ArunR", "Dog");
instance.insertEnquiryData("ArunR", "Dog");
instance.insertEnquiryData("ArunR", "Dog");
instance.insertEnquiryData("ArunR", "Dog");
instance.insertEnquiryData("ArunR", "Dog");
instance.getInventoryData();
instance.sellForTop5();
