function Programmer1() {
    this.languages = [];
}

Programmer1.prototype.learnNewLanguage = function (language) {
    this.languages.push(language);
};

Programmer1.prototype.isPragmatic = function () {
    return this.languages.length > 2;
};

class Programmer2 {
    constructor() {
        this.languages = [];
    }

    learnNewLanguage(language) {
        this.languages.push(language);
    }

    isPragmatic() {
        return this.languages.length > 2;
    }
}

var Programmer3 = {
    learnNewLanguage: function (language) {
        this.languages.push(language);
    },
    isPragmatic: function () {
        return this.languages.length > 2;
    },
    init: function () {
        this.languages = [];
    }

};

function createProgrammer() {
    var languages = [];

    return {
        learnNewLanguage: function (language) {
            languages.push(language);
        },
        isPragmatic: function () {
            return languages.length > 2;
        }
    };
}


module.exports = {
    Programmer1, Programmer2, Programmer3, createProgrammer
};