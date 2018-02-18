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
        .catch(() => res.status(500).json({error_message: "Server error "}));
};