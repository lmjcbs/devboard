class Technology {
  constructor(technology) {
    this.id = technology.id
    this.name = technology.name
    this.positions = technology.positions
  }

  renderTechnology() {
    return `
      <div>
        <h3>There are ${this.positions.length} positions available using ${this.name}</h3>
      </div>
    `
  }
}