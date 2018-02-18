//Models
const interestsRepository = require('../interests/interest.repository');

/**
 * Get all interests in database
 *
 * @param req Request
 * @param res Response
 */
exports.getInterests = function(req,res){
  interestsRepository.getAllInterests()
      .then(interests => res.status(200).json({interests:interests }))
      .catch(error => res.status(500).json({"message_error": error}));
};