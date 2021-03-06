import { db } from "../src/db.js";

export async function seedUsers() {
  await db.query(`
    INSERT INTO RoomScheduler.Users (userName,passwordHash,\`role\`,createdAt) VALUES
    ('admin','dd64c4e90406fee64f9cbd8f73ee045d7a7322132a603a29f5f37830a1b41dbd','admin','2021-03-09 00:00:00'),
    ('pigperseuslambchop','bd50e15f59b8b7a42656a1ff925478431bf3168f028d17a0d5bc06a11eb9b0b7','common','2021-03-10 01:27:28'),
    ('octopusmuffinshamfox','5bf11fcef9b9acb30670eb61aa1dc844a54ecbe1a913ada11aa6571a1c132d20','common','2021-03-10 01:27:38'),
    ('peanutsdroughtswan','54273cad14ce57809323dbb7d0dbe132799ae44f5a865c5fb32c2adb4a2caf85','common','2021-03-10 01:27:46'),
    ('sourcreamicecoffee','f43308a041a4c0bee6429283733b70ea421bc623139c2bc5010e1984ee952114','common','2021-03-10 01:27:54'),
    ('vegafencingkidneypie','25d43b720825c6e1d722337680ca326c0fdf3b7931612e3d67c64b8aa5ef6b7f','common','2021-03-10 01:28:07'),
    ('sweetrollskittenkale','c2dffdfac6d6030b87f84c8950ed609772b69bac1b9fea27bf7afad3c6fb3b00','common','2021-03-10 01:28:16'),
    ('chickenvibrantfogfox','a36c5bde1569a2aa2708c57b47a3650cfe075fb0d242bcbc14de595ab32a466e','common','2021-03-10 01:28:24'),
    ('animaltracksbanepie','633487ed8c27f3cd57c0434f019d76121e511173a639888083d9009549221066','common','2021-03-10 01:28:32'),
    ('venisoncrackersse7en','df4def91f8b14a66bb55fdeb5cc0323595318156772643053d731486eb580f76','common','2021-03-10 01:28:39'),
    ('ceruleaninstrument','8b32173ddd34a267c505f3fed87040ae07e1455b983a2d855efa6ceb8ab195ed','common','2021-03-10 01:28:47'),
    ('aromaticrosesunrise','e0af0066d8b30b2c2c384c97b2b9480269169dd681aa9e07aec224c6c21b0a72','common','2021-03-10 01:29:00'),
    ('hoagsobjectpuppynet','9704dfe98f6fa65f44256bbe7cb706476c5d711933bc14b2f8903a2966729b00','common','2021-03-10 01:29:08'),
    ('porcupineapplepiepie','b41a64e78a25fe39e2de64501dd177f764c268e3cec196d9adf6347861f0e5c3','common','2021-03-10 01:29:14'),
    ('croissantcellopepper','a71050ce37dd586e408b7e2a9fbac0d129717e1e6c10fa76fb145c103e708a84','common','2021-03-10 01:29:26'),
    ('spiralshapelimealien','018b2095dbb3077d35398f1dc4d91d52a0338c275ccafc87e5a57f435a769716','common','2021-03-10 01:29:35'),
    ('judonectarineryesong','21da8d7914fde01d36d7fd25577ea83e3ecb52de8a6e67dac4f62b3d5c7f9274','common','2021-03-10 01:29:41'),
    ('skisvirgounforgiven','95ab411a0293966c7160f5ab9d1e403ab8cd31c52be3463cd9bddd155d7c5c9e','common','2021-03-10 01:29:47'),
    ('violastalkerarticfog','6279bde84f42b8957d71072cc7183caf8ac635288680eb4eb12432c0c543f3f1','common','2021-03-10 01:29:54'),
    ('piealamodewalruseris','4bd314b5af0ec6b87802c82f35efc39d80720d0e0ae1354cf9c9905a54f2af68','common','2021-03-10 01:30:00'),
    ('antmuffintropicalpie','d44a18a228ac2f3828269bedb884ba1eb2c9657e3a704fcf3fed04550d97aa3c','common','2021-03-10 01:30:07'),
    ('prunesevensamuraisun','63e450f024783d92d82ec8b2b50589880fa91958a08e6dc903c402c23889efc6','common','2021-03-10 01:30:15'),
    ('batflyinginsectbat','d812d5288a50a18c9c60665bf771e92f8d890117029d4649a154c5f9e0969412','common','2021-03-10 01:30:21'),
    ('milkbeatwrestlingnet','02a80dfe124483961c60326997d6379f9750929a3b4ad9116323cd6eaeba762b','common','2021-03-10 01:30:26'),
    ('psychosweetrollsbush','b6a9ec9b46146419684405764388bcc053940a12b4175e3d4ebdf11c0e0dd637','common','2021-03-10 01:30:32'),
    ('jurassicparkclefjudo','529933849b6d3718353f4754f78f684616f63300c836c68dfe5880dff66e317b','common','2021-03-10 01:30:37');
  `);
}

export async function seedRooms() {
  await db.query(`
    INSERT INTO RoomScheduler.Rooms (name,createdAt) VALUES
    ('Room 1', '2021-03-10 01:30:30'),
    ('Room 2', '2021-03-10 01:30:30'),
    ('Room 3', '2021-03-10 01:30:30'),
    ('Room 4', '2021-03-10 01:30:30'),
    ('Room 5', '2021-03-10 01:30:30'),
    ('Room 6', '2021-03-10 01:30:30'),
    ('Room 7', '2021-03-10 01:30:30'),
    ('Room 8', '2021-03-10 01:30:30'),
    ('Room 9', '2021-03-10 01:30:30'),
    ('Room 10', '2021-03-10 01:30:30'),
    ('Room 11', '2021-03-10 01:30:30'),
    ('Room 12', '2021-03-10 01:30:30'),
    ('Room 13', '2021-03-10 01:30:30'),
    ('Room 14', '2021-03-10 01:30:30'),
    ('Room 15', '2021-03-10 01:30:30'),
    ('Room 16', '2021-03-10 01:30:30'),
    ('Room 17', '2021-03-10 01:30:30'),
    ('Room 18', '2021-03-10 01:30:30'),
    ('Room 19', '2021-03-10 01:30:30'),
    ('Room 20', '2021-03-10 01:30:30'),
    ('Room 21', '2021-03-10 01:30:30'),
    ('Room 22', '2021-03-10 01:30:30'),
    ('Room 23', '2021-03-10 01:30:30'),
    ('Room 24', '2021-03-10 01:30:30'),
    ('Room 25', '2021-03-10 01:30:30'),
    ('Room 26', '2021-03-10 01:30:30'),
    ('Room 27', '2021-03-10 01:30:30'),
    ('Room 28', '2021-03-10 01:30:30'),
    ('Room 29', '2021-03-10 01:30:30'),
    ('Room 30', '2021-03-10 01:30:30'),
    ('Room 31', '2021-03-10 01:30:30'),
    ('Room 32', '2021-03-10 01:30:30'),
    ('Room 33', '2021-03-10 01:30:30'),
    ('Room 34', '2021-03-10 01:30:30'),
    ('Room 35', '2021-03-10 01:30:30'),
    ('Room 36', '2021-03-10 01:30:30'),
    ('Room 37', '2021-03-10 01:30:30'),
    ('Room 38', '2021-03-10 01:30:30'),
    ('Room 39', '2021-03-10 01:30:30'),
    ('Room 40', '2021-03-10 01:30:30'),
    ('Room 41', '2021-03-10 01:30:30'),
    ('Room 42', '2021-03-10 01:30:30'),
    ('Room 43', '2021-03-10 01:30:30')
  `);
}

function randomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function seedAllocations() {
}

export async function seedDb() {
  await seedUsers();
  await seedRooms();
  await seedAllocations();
}

seedDb();