const db = firebase.firestore();
const mailField = document.getElementById('mail')
const authrec = firebase.auth();

function resetPasswordFunction () {
    const email = mailField.value;
    authrec.sendPasswordResetEmail(email)
    .then(() => {
        alert('Se ha enviado el email de recuperación correctamente')
    })
    .catch(error => {
        console.error(error);
        alert('Error al enviar el email de recuperación')
    })
}

function add(collection, doc) {
    return new Promise((resolve, reject) => {       
        collection.add(doc)
            .then((doc) => {                //return correcte
                resolve(doc);
            })
            .catch(() => {                  //return fallit
                reject();
            });
    });
}

function deleteById(collection, id) {
    return new Promise((resolve, reject) => {
        collection.doc(id).delete()
            .then((doc) => {
                resolve(doc);
            })
            .catch(() => {
                reject();
            });
    });
}

function selectAll(collection, orderByField = null) {
    if (orderByField != null) {
        return new Promise((resolve, reject) => {
            collection.orderBy(orderByField).get()
                .then((querySnapshot) => {
                    let docs = [];
                    querySnapshot.forEach((doc) => {
                        docs.push(doc);
                    });
                    resolve(docs);
                })
                .catch(() => {
                    reject();
                });
        });
    } else {
        return new Promise((resolve, reject) => {
            collection.get()
                .then((querySnapshot) => {
                    let docs = [];
                    querySnapshot.forEach((doc) => {
                        docs.push(doc);
                    });
                    resolve(docs);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}

function selectById(collection, id) {
    return new Promise((resolve, reject) => {
        collection.doc(id).get()
            .then((doc) => {
                resolve(doc);
            })
            .catch(() => {
                reject();
            });
    });
}

function selectWhere(collection, field, operator, value) {
    return new Promise((resolve, reject) => {
        collection.where(field, operator, value).get()
            .then((querySnapshot) => {
                let docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push(doc);
                });
                resolve(docs);
            })
            .catch(() => {
                reject();
            });
    });
}

function selectLike(collection, field, value) {
    //IMPORTANT: únicament retorna els documents que comencen pel valor indicat
    return new Promise((resolve, reject) => {
        collection.orderBy(field).startAt(value).endAt(value + '\uf8ff').get()
            .then((querySnapshot) => {
                let docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push(doc);
                });
                resolve(docs);
            })
            .catch(() => {
                reject();
            });
    });
}

function updateById(collection, id, doc) {
    return new Promise((resolve, reject) => {
        collection.doc(id).update(doc)
            .then((doc) => {
                resolve(doc);
            })
            .catch(() => {
                reject();
            });
    });
}