const express=require('express');
const router=express.Router();
const passport=require('passport');
const users_controller=require('../controllers/users_controller');
const localStrategy=require('../config/passport-local-strategy');

router.get('/profile/:id', passport.checkAuthentication , users_controller.profile);
router.get('/sign-up', users_controller.signUp);
router.get('/sign-in', users_controller.signIn);
router.post('/create', users_controller.create);
router.post('/create-session', passport.authenticate('local', {failureRedirect:'/users/sign-in'}), users_controller.create_session);
/* used passport as middleware to authenticate */
router.get('/sign-out', users_controller.destroySession);
router.post('/update/:id', passport.checkAuthentication, users_controller.update);
/* google oauth2.0 */
router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), users_controller.create_session);

module.exports=router;