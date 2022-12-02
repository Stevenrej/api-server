'use strict';

class ModelInterface {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    console.log('this is our json', json)
    try {
      let record = await this.model.create(json);
      return record;
    } catch (e) {
      console.error('we have a ModelInterface create error', e);
      return e;
    }
  }

  async read(id = null) {
    try {
      if (id) {

        let record = await this.model.findOne({ where: { id } });
        return record;
      } else {
        let record = await this.model.findAll();
        return record;
      }
    } catch (e) {
      console.error('we have a ModelInterface read error', e);
      return e;
    }
  }

  async readManyToOne(id, model) {
    try {
      let record = await this.model.findOne({
        where: { id },
        include: model
      });
      return record;
    } catch (e) {
      console.error('we have a ModelInterface readTomanyone error', e)
    }
  }

  async update(json, id) {
    try {
      await this.model.update(json, { where: { id } });
      let record = await this.model.findOne({ where: { id } });
      return record;

    } catch (e) {
      console.error('we have a ModelInterface update error', e);
      return ee;
    }
  }

  async destroy(id) {
    try {
      await this.model.destroy({ where: { id } });
    } catch (e) {
      console.error('we have a ModelInterface destroy error', e);
      return e;
    }
  }
}


module.exports = ModelInterface;