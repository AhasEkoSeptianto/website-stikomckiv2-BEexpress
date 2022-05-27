exports.ShowErrUnique = (err) => {
    return Object.values(err.errors).map(val => val.message)[0].replace('must be unique','') + 'alredy exist'
}