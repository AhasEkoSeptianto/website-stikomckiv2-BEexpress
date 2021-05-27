const User = require('./../../models/mongodb/users');

exports.changeName = async (req, res) => {
	
	if (!req.body.newName || !req.body.userName){
		res.status(400).json({msg: 'unknown user'})
	}


	var change = await User.findOneAndUpdate({name: req.body.userName},{name: req.body.newName}, {new : true});

	return res.status(200).json({msg: 'name has changed', newName: req.body.newName});

}