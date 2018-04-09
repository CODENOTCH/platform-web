
# CODENOTCH API DOCS

La API de Codenotch se ha preparado para satisfacer todos las cuestiones referentes a la funcionalidad de la plataforma, se ha buscado la claridad del código y la seguridad de la información frente al rendimiento.
A continuación se presentarán los endpoints explicando los parámetros que tendrán que recibir (si es el caso), un ejemplo de la respuesta de cada uno de estos y el control de errores.


## users/register - POST
- DESCRIPTION: Realiza el registro de un usuario
- PARAMS: {username , password, usertype , mail}
- ERRORS: 500 - database error
- RESPONSE: {
    "username": "rafael",
    "mail": "rafiki_96@msn.com",
    "type": "administrator",
    "_id": "5aa259d38f8ea685386a0ffc",
    "__v": 0
}

## users/login - POST
- DESCRIPTION: Inicia sesión si las credenciales son correctas
- PARAMS: {username, password}
- ERRORS: 401 - unauthorized 
- RESPONSE:    {
        "_id": "5aa259d38f8ea685386a0ffc",
        "username": "rafael",
        "mail": "rafiki_96@msn.com",
        "type": "administrator",
        "__v": 0
    }
  
## users/logout - GET
  - DESCRIPTION: Cierra la sesión del usuario actual.
  - PARAMS: **NONE**
  - ERRORS: **NONE**
  - RESPONSE: **NONE**

## students/insertStudent - POST
- DESCRIPTION: Inserta la información del estudiante
- PARAMS: {DNI, address, phone, description, linkedin, github, twitter,photo,birthdate,bornplace,sex,postalcode,nationality,coursetype,studies,
  workexp,meetus,interestedon,mainobjectives,adminotes,accountnotes,civilstatus,hobbies,themesofinterest,visitedcompanies,jobprofile,paymethod,
  factname,cif,factadress,bootcampid}
- ERRORS: 500 - database error
- RESPONSE: {
    "_id": {
        "$oid": "5ac491382863d6839c8c17fb"
    },
    "FactData": {
        "Name": "papa",
        "CIF": "2908345u29834",
        "Adress": "torqurmada"
    },
    "DNI": 5944409,
    "Adress": "calle torquemada 21",
    "Phone": 618227956,
    "Description": "soyjgvjhvjhgv",
    "Linkedin": "sdaklmflksmnjtjtjtj",
    "Github": "sadlkfjasldfjas",
    "Twitter": "http://twittert.com",
    "Photo": "http://codenotch.com/foto.jp",
    "BornPlace": "sakljvklansvj",
    "Sex": "male",
    "PostalCode": "28043",
    "Nationality": "asdlkfjoksajgf",
    "CourseType": "part",
    "Studies": "none",
    "WorkExp": "jaridnaero",
    "Meetus": "oasjvdoja",
    "InterestedOn": "pekrjownin",
    "MainObjectives": "oasjdjioansdij",
    "AdminNotes": [
        "aosjdvnjsdvnjasn"
    ],
    "ContNotes": [],
    "CivilStatus": "nvjsbajdvbasjhbv",
    "Hobbies": [],
    "ThemesOfInterest": [],
    "VisitedCompanies": [],
    "JobProfile": "blam",
    "PayMethod": "paypal",
    "bootcampid": 5ac48f712863d6839c8c17f8
    "userID": "5ac48f712863d6839c8c17f9",
    "Comment": [],
    "__v": 0
}


## students/deleteStudent - DELETE
- DESCRIPTION: Borra un alumno
- PARAMS: {userid}
- ERRORS: **NONE**
- RESPONSE: **NONE**

## students/getAllStudents - GET
- DESCRIPTION: Devuelve todos los estudiantes
- PARAMS: **NONE**
- ERRORS: **NONE**
- RESPONSE: [
{
    "_id": {
        "$oid": "5ac491382863d6839c8c17fb"
    },
    "FactData": {
        "Name": "papa",
        "CIF": "2908345u29834",
        "Adress": "torqurmada"
    },
    "DNI": 5944409,
    "Adress": "calle torquemada 21",
    "Phone": 618227956,
    "Description": "soyjgvjhvjhgv",
    "Linkedin": "sdaklmflksmnjtjtjtj",
    "Github": "sadlkfjasldfjas",
    "Twitter": "http://twittert.com",
    "Photo": "http://codenotch.com/foto.jp",
    "BornPlace": "sakljvklansvj",
    "Sex": "male",
    "PostalCode": "28043",
    "Nationality": "asdlkfjoksajgf",
    "CourseType": "part",
    "Studies": "none",
    "WorkExp": "jaridnaero",
    "Meetus": "oasjvdoja",
    "InterestedOn": "pekrjownin",
    "MainObjectives": "oasjdjioansdij",
    "AdminNotes": [
        "aosjdvnjsdvnjasn"
    ],
    "ContNotes": [],
    "CivilStatus": "nvjsbajdvbasjhbv",
    "Hobbies": [],
    "ThemesOfInterest": [],
    "VisitedCompanies": [],
    "JobProfile": "blam",
    "PayMethod": "paypal",
    "bootcampid": 5ac48f712863d6839c8c17f8
    "userID": "5ac48f712863d6839c8c17f9",
    "Comment": [],
    "__v": 0
}
]

## students/updateStudent - PUT
- DESCRIPTION: Modifica la información de un estudiante
- PARAMS: {DNI, address, phone, description, links, photo, userID}
- ERRORS: 500 - database error
- RESPONSE: {
    "_id": {
        "$oid": "5ac491382863d6839c8c17fb"
    },
    "FactData": {
        "Name": "papa",
        "CIF": "2908345u29834",
        "Adress": "torqurmada"
    },
    "DNI": 5944409,
    "Adress": "calle torquemada 21",
    "Phone": 618227956,
    "Description": "soyjgvjhvjhgv",
    "Linkedin": "sdaklmflksmnjtjtjtj",
    "Github": "sadlkfjasldfjas",
    "Twitter": "http://twittert.com",
    "Photo": "http://codenotch.com/foto.jp",
    "BornPlace": "sakljvklansvj",
    "Sex": "male",
    "PostalCode": "28043",
    "Nationality": "asdlkfjoksajgf",
    "CourseType": "part",
    "Studies": "none",
    "WorkExp": "jaridnaero",
    "Meetus": "oasjvdoja",
    "InterestedOn": "pekrjownin",
    "MainObjectives": "oasjdjioansdij",
    "AdminNotes": [
        "aosjdvnjsdvnjasn"
    ],
    "ContNotes": [],
    "CivilStatus": "nvjsbajdvbasjhbv",
    "Hobbies": [],
    "ThemesOfInterest": [],
    "VisitedCompanies": [],
    "JobProfile": "blam",
    "PayMethod": "paypal",
    "bootcampid": 5ac48f712863d6839c8c17f8
    "userID": "5ac48f712863d6839c8c17f9",
    "Comment": [],
    "__v": 0
}
## content/insertContent - POST
- DESCRIPTION: Inserta una leccion del contenido
- PARAMS: {mainTitle,Type,pText,Pposition,Routes,imageposition,subposition,subTitles,subposition,Ltext,Lposition}
- ERROS: 500 - database error
- RESPONSE: {
    "Paragraphs": {
        "Ptext": [
            "sijsjdokasdg",
            "sadjkoaisdjf"
        ],
        "Pposition": [
            6,
            2
        ]
    },
    "Images": {
        "route": [
            "sjdaiadsjiasdf",
            "asodifjoasdjf"
        ],
        "imageposition": [
            5,
            0
        ]
    },
    "Subtitles": {
        "subtitle": [
            "isadjfoiasdjiojasdf",
            "pdifjgoidjfgio"
        ],
        "subposition": [
            8,
            9
        ]
    },
    "_id": "5aa904e2a7ad96cf743d0e8d",
    "Title": "oasdjfojsdf",
    "__v": 0
}
## content/getContent - GET
- DESCRIPTION: devuelve el contenido con un id especifico
- PARAMS: {contentid}
- ERRORS: **NONE**
- RESPONSE: {
    "id": "5ac60355ee75f90d91fe0467",
    "data": [
        {
            "type": "title",
            "content": "Introducción al funcionamiento de Internet"
        },
        {
            "type": "text",
            "content": "Internet es una red mundial que para permite la conexión entre ordenadores a través de un protocolo de comunicaciones, formando <strong>una telaraña de información</strong>.",
            "position": 0
        },
        {
            "type": "text",
            "content": "Para entender el funcionamiento de internet. hay que tener claros una serie de conceptos:",
            "position": 1
        },
        {
            "type": "text",
            "content": "Esta petición, que hace el ordenador cliente al servidor cuando se escribe una dirección URL en la barra de direcciones del navegador web, se lleva a cabo a través del protocolo http (una serie de normas que se usa para acceder a páginas web).",
            "position": 2
        },
        {
            "type": "text",
            "content": "Todos los ordenadores conectados a internet (tanto los ordenadores clientes como los servidores) tienen un identificador único (dirección IP). Para poder acceder desde un navegador web a un servidor web, necesitamos conocer la dirección IP del servidor web. Para facilitar esta tarea, está el sistema de nombres de dominio (DNS) que se encarga de traducir las direcciones IP a un nombre identificativo o Dominio",
            "position": 3
        },
        {
            "type": "text",
            "content": "El servidor nos da una respuesta (a la petición solicitada) en forma de archivos HTML, que el navegador entiende e interpreta, como una página web",
            "position": 4
        },
        {
            "type": "text",
            "content": "Para poder acceder directamente a los archivos alojados en un hosting, tenemos el protocolo FTP, que permite transferir datos entre el ordenador cliente y el hosting a través de programas o clientes FTP como Filezilla, Ciberduck o Transmit.",
            "position": 5
        },
        {
            "type": "list",
            "content": "Cliente: Es el ordenador del usuario.",
            "position": 0
        },
        {
            "type": "list",
            "content": "Servidor web o hosting: Es un ordenador que contiene multitud de archivos de información y que “esperan” peticiones de otros ordenadores (clientes), conectados a una red.",
            "position": 1
        },
        {
            "type": "list",
            "content": "Navegador web: Es un programa instalado en el ordenador cliente que sirve para pedir e interpretar la información disponible en un servidor.",
            "position": 2
        },
        {
            "type": "subtitle",
            "content": "hosting",
            "position": 0
        },
        {
            "type": "img",
            "content": "https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/img/contenidos_img1_1.0.0.jpg",
            "position": 0
        },
        {
            "type": "img",
            "content": "https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/img/contenidos_img2_1.0.0.png",
            "position": 1
        }
    ]
}
## content/deleteContent - DELETE
- DESCRIPTION: Elimina una lección por ID
- PARAMS: {contentid}
- ERRORS: 500 - Database error
- RESPONSE: {
    "n": 1,
    "opTime": {
        "ts": "6533497494691643393",
        "t": 1
    },
    "electionId": "7fffffff0000000000000001",
    "ok": 1
}
## content/updateContent - PUT
- DESCRIPTION: Actualiza una lección
- PARAMS: {contentid}
- ERRORS: {400 - document not find, 500 - database error}
- RESPONSE: {
    "id": "5ac60355ee75f90d91fe0467",
    "data": [
        {
            "type": "title",
            "content": "Introducción al funcionamiento de Internet"
        },
        {
            "type": "text",
            "content": "Internet es una red mundial que para permite la conexión entre ordenadores a través de un protocolo de comunicaciones, formando <strong>una telaraña de información</strong>.",
            "position": 0
        },
        {
            "type": "text",
            "content": "Para entender el funcionamiento de internet. hay que tener claros una serie de conceptos:",
            "position": 1
        },
        {
            "type": "text",
            "content": "Esta petición, que hace el ordenador cliente al servidor cuando se escribe una dirección URL en la barra de direcciones del navegador web, se lleva a cabo a través del protocolo http (una serie de normas que se usa para acceder a páginas web).",
            "position": 2
        },
        {
            "type": "text",
            "content": "Todos los ordenadores conectados a internet (tanto los ordenadores clientes como los servidores) tienen un identificador único (dirección IP). Para poder acceder desde un navegador web a un servidor web, necesitamos conocer la dirección IP del servidor web. Para facilitar esta tarea, está el sistema de nombres de dominio (DNS) que se encarga de traducir las direcciones IP a un nombre identificativo o Dominio",
            "position": 3
        },
        {
            "type": "text",
            "content": "El servidor nos da una respuesta (a la petición solicitada) en forma de archivos HTML, que el navegador entiende e interpreta, como una página web",
            "position": 4
        },
        {
            "type": "text",
            "content": "Para poder acceder directamente a los archivos alojados en un hosting, tenemos el protocolo FTP, que permite transferir datos entre el ordenador cliente y el hosting a través de programas o clientes FTP como Filezilla, Ciberduck o Transmit.",
            "position": 5
        },
        {
            "type": "list",
            "content": "Cliente: Es el ordenador del usuario.",
            "position": 0
        },
        {
            "type": "list",
            "content": "Servidor web o hosting: Es un ordenador que contiene multitud de archivos de información y que “esperan” peticiones de otros ordenadores (clientes), conectados a una red.",
            "position": 1
        },
        {
            "type": "list",
            "content": "Navegador web: Es un programa instalado en el ordenador cliente que sirve para pedir e interpretar la información disponible en un servidor.",
            "position": 2
        },
        {
            "type": "subtitle",
            "content": "hosting",
            "position": 0
        },
        {
            "type": "img",
            "content": "https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/img/contenidos_img1_1.0.0.jpg",
            "position": 0
        },
        {
            "type": "img",
            "content": "https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/img/contenidos_img2_1.0.0.png",
            "position": 1
        }
    ]
}
## docs/uploadImage - POST
- DESCRIPTION: Sube una imagen al servidor y devuelve la ruta
- PARAMS: {filetoupload}
- ERRORS: **NONE**
- RESPONSE: {
    "code": 200,
    "route": "public/images/rafa.jpg"
}
## docs/removeImage - DELETE
- DESCRIPTION: Elimina una imagen del servidor
- PARAMS: {filetoremove}
- ERRORS **NONE**
- RESPONSE: {
    "code": 200,
    "message": "public/images/rafa.jpg removed"
}
## contentIndex/ - GET
- DESCRIPTION: Devuelve el indice de los contenidos
- PARAMS: **NONE**
- ERRORS **NONE**
- RESPONSE: [
    {
        "Title": "oasdjfojsdf",
        "id": "5ac60355ee75f90d91fe0467",
        "Type": "tema",
        "active": true
    },
    {
        "Title": "Socket.io",
        "id": "5ac6036aee75f90d91fe0468",
        "Type": "tema"
        "active": false
    }
]
##developments/insertDevelopment - POST
- DESCRIPTION: Inserta un desarrollo
- PARAMS: {devTitles,contentids,devPtext,devPposition,devRoutes,imageposition}
- ERRORS 500 - database error
- RESPONSE: {
    "Paragraphs": {
        "Ptext": [
            "Internet es una red mundial sit amet, consectetur adipiscing elit. Fusce at temp us metus. Ut at eros quis augue consequat dignissim.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut id velit tristiqueligula tempus hendrerit a nec justo. Integer tempor ante ipsum. Ante ipsum primis in eros quisad.",
            "¿Qué sabes de internet? sit amet, consectetur adipiscing elit. Fusce at temp us metus. Ut at eros quis augue consequat dignissim.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut id velit tristiqueligula tempus hendrerit a nec justo. Integer tempor ante ipsum. Ante ipsum primis in eros quisad."
        ],
        "Pposition": [
            0,
            2
        ]
    },
    "Images": {
        "route": [
            "https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/img/desarrollos_img1_1.0.jpg",
            "https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/img/desarrollos_img2_1.0.jpg"
        ],
        "imageposition": [
            1,
            3
        ]
    },
    "Titles": [
        "1. Terminos relacionados con Internet",
        "2. Demuestra tus conocimientos de internet"
    ],
    "Contentids": [
        "5ab8c0c84fd3cb1b43a7bfc8",
        "5ab8c0c84fd3cb1b43a7bfc9"
    ],
    "_id": "5ac75e7d88bc650d80f94c89",
    "__v": 0
}
##developments/getDevelopment - GET
- DESCRIPTION: Devuelve un desarrollo
- PARAMS: {developid}
- ERRORS 500 - database error
- RESPONSE: {
    "id": "5ac75e7d88bc650d80f94c89",
    "relatedIds": [
        "5ab8c0c84fd3cb1b43a7bfc8",
        "5ab8c0c84fd3cb1b43a7bfc9"
    ],
    "data": [
        {
            "id": "5ac75e7d88bc650d80f94c89"
        },
        {
            "type": "text",
            "content": "Internet es una red mundial sit amet, consectetur adipiscing elit. Fusce at temp us metus. Ut at eros quis augue consequat dignissim.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut id velit tristiqueligula tempus hendrerit a nec justo. Integer tempor ante ipsum. Ante ipsum primis in eros quisad.",
            "position": 0
        },
        {
            "type": "text",
            "content": "¿Qué sabes de internet? sit amet, consectetur adipiscing elit. Fusce at temp us metus. Ut at eros quis augue consequat dignissim.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut id velit tristiqueligula tempus hendrerit a nec justo. Integer tempor ante ipsum. Ante ipsum primis in eros quisad.",
            "position": 2
        },
        {
            "type": "Title",
            "content": "1. Terminos relacionados con Internet"
        },
        {
            "type": "Title",
            "content": "2. Demuestra tus conocimientos de internet"
        },
        {
            "type": "img",
            "content": "https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/img/desarrollos_img1_1.0.jpg",
            "position": 1
        },
        {
            "type": "img",
            "content": "https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/img/desarrollos_img2_1.0.jpg",
            "position": 3
        }
    ]
}
## developments/deleteDevelopment - DELETE
- DESCRIPTION: Elimina una imagen del servidor
- PARAMS: {developid}
- ERRORS 500 - database error
- RESPONSE: {
    "n": 1,
    "opTime": {
        "ts": "6541302558370037761",
        "t": 1
    },
    "electionId": "7fffffff0000000000000001",
    "ok": 1
}
## developments/updateDevelopment - PUT
- DESCRIPTION: Actualiza un desarrollo
- PARAMS: {developid}
- ERRORS: {400 - document not find, 500 - database error}
- RESPONSE: {
    "Paragraphs": {
        "Ptext": [
            "wlfmjakosjd"
        ],
        "Pposition": [
            4
        ]
    },
    "Images": {
        "route": [
            "aosijfiuwqjefiuwjef"
        ],
        "imageposition": [
            6
        ]
    },
    "Titles": [],
    "Contentids": [
        "5ac60355ee75f90d91fe0467"
    ],
    "_id": "5ac6089379045f0dbeb102fe",
    "__v": 0
}
##slides/insertSlides - POST
-DESCRIPTION: Inserta una slide en la base de datos
-PARAMS: {slideids,slideRoute}
-ERRORS: 500 - database error}
-RESPONSE: {
    "Slideids":  ["5ab8c0c84fd3cb1b43a7bfc7"],
    "Routes": ["https://jdmiguel.com/codenotch_data/pdf/slide_1.0.0.pdf#toolbar=0&navpanes=0&scrollbar=0"]
}
##slides/getSlides - GET
-DESCRIPTION: Devuelve una slide
-PARAMS: {slideid}
-ERRORS: **NONE**
-RESPONSE: {
    "Slideids":  ["5ab8c0c84fd3cb1b43a7bfc7"],
    "Routes": ["https://jdmiguel.com/codenotch_data/pdf/slide_1.0.0.pdf#toolbar=0&navpanes=0&scrollbar=0"]
}
