// In-memory storage for enquiries
let enquiries = [];
let idCounter = 1;

class Enquiry {
  constructor(data) {
    this.id = idCounter++;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.message = data.message;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static async findAll(options = {}) {
    let result = [...enquiries];
    if (options.order) {
      const [field, direction] = options.order[0];
      result.sort((a, b) => {
        if (direction === 'DESC') {
          return b[field] - a[field];
        }
        return a[field] - b[field];
      });
    }
    return result;
  }

  static async create(data) {
    const enquiry = new Enquiry(data);
    enquiries.push(enquiry);
    return enquiry;
  }

  static async findByPk(id) {
    return enquiries.find(e => e.id === parseInt(id));
  }

  async update(data) {
    Object.assign(this, data);
    this.updatedAt = new Date();
    return this;
  }

  async destroy() {
    const index = enquiries.findIndex(e => e.id === this.id);
    if (index !== -1) {
      enquiries.splice(index, 1);
    }
  }
}

module.exports = Enquiry; 