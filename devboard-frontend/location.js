class Location {
  constructor(location) {
    this.id = location.id
    this.city = location.city
    this.positions = location.positions
  }

  renderLocation() {
    return `
      <div>
        <h3>${this.city} has ${this.positions.length()} positions available</h3>
      </div>
    `
  }
}