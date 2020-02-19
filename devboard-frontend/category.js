class Category {
  constructor(category) {
    this.id = category.id;
    this.name = category.name;
    this.positions = category.positions;
  }

  renderCategory() {
    return `
      <div>
        <h3>There are ${this.positions.length} ${this.name} positions available</h3>
      </div>
    `;
  }
}
