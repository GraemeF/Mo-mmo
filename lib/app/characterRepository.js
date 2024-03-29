var CharacterRepository = function (eventStore, domainEvents, Character) {
    this.eventStore = eventStore;
    this.domainEvents = domainEvents;
    this.Character = Character != null ? Character : require("../../lib/domain/Character");
};

CharacterRepository.prototype.storeCharacter = function (character) {
    this.eventStore.append(character.uncommittedEvents);
    this.domainEvents.publish(character.uncommittedEvents);
    return character.uncommittedEvents = [];
};

CharacterRepository.prototype.getCharacter = function (id) {
    return new this.Character(this.eventStore.events);
};

module.exports = CharacterRepository;
