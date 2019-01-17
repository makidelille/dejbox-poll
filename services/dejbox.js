const RSS = require('rss');


let options = {
    title: 'RSS Feed Dejbox Poll',
    description: 'Event in the dejbox poll',
    language: 'FR',
    pubDate: 'May 20, 2012 04:00:00 GMT',
    ttl: '1'
}


const feed = new RSS(options);

class DejBoxService {
    constructor(orga){
        this.orga = orga;

        this.dejbox = {};
        this.selectedUser = undefined;
        this.isOpen = true;
    }

    addDejbox(id, name){
        if(!this.isOpen) return false;

        feed.item({
            title:  `La dejbox n°${id} a été commandée`,
            description: `${name} a pris la dejbox ${id}`,
            author: name,
            date: Date.now(), // any format that js Date can parse.
        });

        this.dejbox[id] = name;
        return true;
    }

    toArray(){
        return this.listDejbox().map(n => ({id: n, name: this.dejbox[n]}));
    }

    listDejbox(){
        return Object.getOwnPropertyNames(this.dejbox);
    }

    getUniqueUsers(){
        return this.getUsers().filter((value, index) => self.indexOf(value) === index);
    }

    getUsers(){
        return Object.getOwnPropertyNames(this.dejbox).map(id => this.dejbox[id]);
    }

    finish(){
        let users = this.getUsers();
        this.selectedUser =  users[Math.floor(Math.random()*users.length)];


        feed.item({
            title:  `Les commandes à prendre sont : ${this.listDejbox().join(', ')}`,
            description: `${this.selectedUser} va prendre les dejbox ${this.listDejbox().join(', ')}`,
            author: this.selectedUser,
            date: Date.now(), // any format that js Date can parse.
        });

        this.isOpen = false;
        return this.selectedUser;
    }

    getRssFeed(){
        return feed.xml({indent: true});
    }
}

module.exports = DejBoxService;