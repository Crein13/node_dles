class Serializer {

  // 
  constructor(properties) {
    this.properties = properties;
  }

  serialize(input) {
    const properties = this.properties;
    let data = {
      deserialized : input,
      serialized: {}
    };

    properties.reduce(this.reducer, data);

    return data.serialized;
  }

  reducer(data, property){
    if(data.deserialized.hasOwnProperty(property)) {
      data.serialized[property] = data.deserialized[property];
    } else {
      data.serialized[property] = null;
    }

    return data;
  }

}

module.exports = Serializer;