class availability {
    constructor() {
      this.pet = [];
    }
    insertPetData(petName, adopted, type) {
      this.pet.push({ petName, adopted, type, id: this.pet.length + 1 });
    }
    getPetData() {
      return this.pet;
    }
    updatePetData(petType) {
      let index = instance
        .getPetData()
        .findIndex((el) => el.adopted === "N" && el.type === petType);
      if (index >= 0) {
        this.pet[index].adopted = "Y";
      } else {
        console.log(`No ${petType} available`);
      }
    }
  }
  
  class requestClass extends availability {
    constructor() {
      super();
      this.enquiry = [];
      this.count = {};
    }
    insertEnquiryData(guardian, petType) {
      this.enquiry.push({
        guardian,
        petType,
        id: this.enquiry.length + 1,
        status: "OPEN",
      });
    }
    getDataFromAnimal() {
      return this.pet;
    }
    getEnquiryData() {
      return this.enquiry;
    }
    resetCount() {
      this.count = {};
    }
  
    getInventoryData() {
      this.resetCount();
      let source = this.getPetData().filter((e) => e.adopted === "N");
      for (let i = 0; i < source.length; i++) {
        if (this.count[source[i].type] >= 0) {
          this.count[source[i].type] = this.count[source[i].type] + 1;
        } else {
          this.count[source[i].type] = 1;
        }
      }
      return this.count;
    }
  
    getAvailableStatusForTop5() {
      let filteredValues = this.enquiry.filter((e) => e.status === "OPEN");
      this.getInventoryData();
      let countReplicate = { ...this.count };
      let possible = [];
      let length = filteredValues.length;
      if (length > 5) {
        length = 5;
      }
      for (let i = 0; i < length; i++) {
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
            requestFulFilment: "Y",
          });
        } else {
          possible.push({
            guardian: filteredValues[i].guardian,
            petType: filteredValues[i].petType,
            id: filteredValues[i].id,
            requestFulFilment: "N",
          });
        }
      }
      return possible;
    }
    decrementInventory(petType) {
      this.updatePetData(petType);
      this.getInventoryData();
    }
    sellForTop5() {
      let filteredVals = this.getAvailableStatusForTop5().filter(
        (e) => e.requestFulFilment === "Y"
      );
      // let countReplicate = {...this.count}
      for (let i = 0; i < filteredVals.length; i++) {
        //  Object.assign({},this.enquiry[i],{status='CLOSED'})
        // let index = instancfilteredVals[i].getEnquiryData().findIndex(el=>el.id==filteredVals[i].id)
        // this.enquiry[index].status='CLOSED'
        let index = instance
          .getEnquiryData()
          .findIndex((el) => el.id === filteredVals[i].id);
        this.enquiry[index].status = "CLOSED";
        this.decrementInventory(filteredVals[i].petType);
        // this.count[this.getPetData()[i].type] = this.count[this.getPetData()[i].type] + 1
        // this.count[filteredVals[i].petType] = this.count[filteredVals[i].petType] - 1
        // console.log(this.count)
        // console.log(filteredVals[i].petType,this.count[filteredVals[i].petType],filteredVals[i].id)
      }
      return this.count;
    }
  }
  
  let instance = new requestClass();
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
  instance.sellForTop5()