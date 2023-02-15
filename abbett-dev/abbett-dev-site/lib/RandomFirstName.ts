// Return a random first name
const firstNames = [
    'Breann','Matthias','Kylee','Katia','Estevan','Lawson','Darrin','Jevon','Graham','Amiyah',
    'Jonathon','Leigha','Theo','Darien','Aylin','Yisroel','Katelyn','Sky','Lindsay','Justin',
    'Casandra','Garret','Jett','Verania','Baylee','Aspen','Rita','Zariah','Loren','Jordy','Dimitri',
    'Ronald','Siobhan','Quinn','Maritza','Jeanette','Mikael','Sofia','Corey','Rayna','Aya','Jakob',
    'Gunnar','Mackenna','Josh','Mateo','Lillie','Isabella','Hayley','Jordan','Neo','Kain','Candace',
    'Kerri','Dashaun','Carl','Codey','Bailey','Kennedy','Kelis','Salena','Thea','Xiomara','Simon',
    'Baylor','Cecil','Maren','Amalia','Jacinda','Kerry','Trever','Lesli','Ramon','Grecia','Trace',
    'Joseline','Richard','Adeline','Infant','Shanya','Kaylyn','Jacqueline','Kimberly','Griffin',
    'Norman','Marquez','Dorothy','Harvey','Diana','Jerome','Mikaila','Johnnie','Joy','Jodie','Connor',
    'Jovanny','Lynsey','Gino','Jodi','Lucero','Cristopher','Jacie','Quincy','Alessandro','Jennifer',
    'Adamaris','Mckinley','Annaliese','Hope','Shae','Carrington','Jovanni','Amberly','Pearl','Rita',
    'Chantal','Keyanna','Alex','Bailee','Tristin','Donald','Griselda','Ervin','Shivani','Micayla','Luciano',
    'Kole','Payton','Donovan','Darian','Caitlin','Kelsy','Autumn','Kristian','Kaylin','Alvaro','William',
    'Maricela','Jalyn','Raymond','Ashton','Sahara','Amir','Infant','Eduardo','Lilia','Obed','Alliyah','Dulce',
    'Dayton','George','Jamison','Luther','Lorena','Jadyn','Claudio','Aiyana','Nestor','Kaitlynn','Annemarie',
    'Mariah','Domenic','Calista','Milo','Coby','Aleah','Beau','Holly','Abigail','Armani','Julianne','Quinton',
    'Darien','Jason','Shayla','Montana','Celine','Javier','Brandyn','Sophie','Allen','Hayden','Will','Madelyne',
    'Nevin','Cruz','Jaleel','Mohamed','Kalie','Jaylan','Bill','Daryl','Beatrice','Jerrod','Ronnie','Hollie',
    'Ellie','Melvin','Aubrey','Gaige'
];

const RandomFirstName = () => {
    return firstNames[Math.floor(Math.random() * firstNames.length)];
};

export default RandomFirstName;