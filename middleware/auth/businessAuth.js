const businessUser = require('../../models/users/businessUser');

const businessAuth = async (req, res, next) => {
  try {
    if (req.body.businessID || req.params.businessID) {
      const businessID = req.body.businessID || req.params.businessID;
      const business = await businessUser.findById(businessID);
      if (!business) {
        res.json({ error: 'Business not found' });
        return;
      }

      next();
    } else {
      res.json({ error: 'No Business ID found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server error - business auth' });
  }
};

module.exports = businessAuth;
