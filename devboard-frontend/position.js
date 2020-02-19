class Position {
  constructor(pos) {
    this.id = pos.id;
    this.title = pos.title;
    this.company = pos.company;
    this.description = pos.description;
    this.salaryGBP = pos.salaryGBP;
    this.experienceRequired = pos.experienceRequired;
    this.location = pos.location;
    this.category = pos.category;
    this.technology = pos.technology;
  }

  renderPosition() {
    return `
    <div id="position-${this.id}">
      <h3>${this.title} at ${this.company}</h3>
      <p>${this.location}</p>
      <p>${this.category} |  ${this.technology}</p>
      <p>Salary: £${this.salaryGBP}</p>
      <p>Experience Required: ${this.experienceRequired}</p>
      <p>${this.description}</p>
    </div>
    <hr>
    `;
  }
}
