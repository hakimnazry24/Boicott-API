const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./boicott.db");

/*
Table:
1. Retailer - retailer that sells products. Example Mydin, KK Mart, SpeedMart etc
2. Product - products sold by different retailers
3. Company - company of products

Relationship:
Retailer(one to many) - Product(one to one)
Product(one to one) - Company(one to many)

Retailer table columns:
1. PK: id
2. name
3. country

Company table columns:
1. PK: id,
2. name
3. status
4. status_reason
5. evidence_link
6. image
7. about
8. more_info

Product table column
1. PK: id
2. name
3. serial_number
4. FK: retailer_id 
5. FK: company_id
*/

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS Retailer(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      country TEXT NOT NULL
    )`
  );

  /* 
      status column in Company table:
       value 0: neutral (no news regarding the company whether support palestine or israel)
       value 1: support palestine
       value 2: support israel

      Default value:
       status: 0
       status_reason: 'no news regarding the company supporting palestine or israel'

       *the default value indicates that all companies are by default neutral, supporting nor israel or palestine*
  */
  db.run(
    `CREATE TABLE IF NOT EXISTS Company(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      status INTEGER NOT NULL DEFAULT 0,
      status_reason TEXT NOT NULL DEFAULT 'no news regarding the company supporting palestine or israel',
      evidence_link TEXT,
      image TEXT,
      about TEXT,
      more_info TEXT
      )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS Product(
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT NOT NULL, 
      serial_number INTEGER NOT NULL, 
      retailer_id INTEGER,
      company_id INTEGER,
      FOREIGN KEY (retailer_id) REFERENCES Retailer(id),
      FOREIGN KEY (company_id) REFERENCES Company(id)
      )`
  );

  // db.run(`INSERT INTO Retailer(name, country) VALUES(?, ?)`, [
  //   "Mydin",
  //   "Malaysia",
  // ]);

  // db.run(
  //   `INSERT INTO Company(name, status, status_reason, evidence_link, image, about, more_info) VALUES(?, ?, ?, ?, ?, ?, ?)`,
  //   [
  //     "Coca-cola Company",
  //     2,
  //     "Coca-Cola has a factory in Atarot, an illegal Israeli settlement built on stolen Palestinian land. Palestinian communities are forcibly removed for illegal Israeli settlements like this to be built. These settlements are illegal under international law.By having an Israeli franchise in the illegal Israeli settlement of Atarot, Coca-Cola is ignoring international law and profiting from the illegal occupation.",
  //     "https://www.foa.org.uk/campaign/boycottcocacola",
  //     "coca-cola-company.png",
  //     "Coca-Cola is a globally renowned carbonated soft drink manufactured by The Coca-Cola Company. It was invented in 1886 by pharmacist John Stith Pemberton in Columbus, Georgia, United States",
  //     "Don't buy Coca-cola products.Don't sell Cola-cola products.Don't work for Coca-cola.",
  //   ]
  // );
  // db.run(
  //   `INSERT INTO Company(name, status, status_reason, evidence_link, image, about,  more_info) VALUES(?, ?, ?, ?, ?, ?, ?)`,
  //   [
  //     "Nestle",
  //     2,
  //     "President Recep Tayyip Erdogan-led Turkey’s parliament on Tuesday removed Coca-Cola and Nestle products from its restaurants' menu over the companies' alleged support for Israel in the ongoing war with Hamas fighters.",
  //     "https://www.livemint.com/news/world/turkeys-parliament-removes-coca-cola-and-nestle-products-over-alleged-support-for-israel-in-war-with-hamas-11699364292991.html",
  //     "nestle.png",
  //     "Nestlé is one of the largest food and beverage companies globally, headquartered in Vevey, Switzerland. It was founded in 1866 by Henri Nestlé, a pharmacist, who initially developed a nutritious infant cereal. Over the years, Nestlé has expanded its product offerings through acquisitions and innovations to cover a wide range of food and beverage categories.",
  //     "Don't buy Nestle products.Don't sell Nestle products.Don't work for Nestle.",
  //   ]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["Coca-cola Vanilla", 398749198, 1, 1]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["Coca-cola Classic", 2847584002, 1, 1]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["Sprite", 20394857, 1, 1]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number,retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["Fanta", 293845756, 1, 1]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["Powerade", 65748302, 1, 1]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["Dasani", 17593057, 1, 1]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["Maggi", 29837476, 1, 2]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["KitKat", 9986457, 1, 2]
  // );

  // db.run(
  //   `INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ? ,?, ?)`,
  //   ["Nesquik", 112293485, 1, 2]
  // );

  // db.run(
  //   `INSERT INTO Company(name, is_boycott, evidence_link, image, about, boycott_reason, more_info) VALUES(?, ?, ?, ?, ?, ?, ?)`,
  //   [
  //     "",
  //     1,
  //     "",
  //     "",
  //     "",
  //     "",
  //     ""
  //   ]2
  // );
});

module.exports = db;
