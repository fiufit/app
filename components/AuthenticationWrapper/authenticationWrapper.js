import {useRecoilState} from "recoil";
import {userDataState} from "../../atoms";
import {useIdToken} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import Authentication from "./Authentication/authentication";
import RegisterSecondStepView from "../RegisterViews/RegisterSecondStep/RegisterSecondStepView";
import AuthenticationController from "../../utils/controllers/AuthenticationController";
import EmailVerification from "./EmailVerification/emailVerification";
import LoadingModal from "../Shared/Modals/LoadingModal/loadingModal";

const AuthenticationWrapper = ({children}) => {

    const [userData, setUserData] = useRecoilState(userDataState);
    const [user, loading] = useIdToken(auth, {
        onUserChanged: async (user) => {
            if(user){
                const controller = new AuthenticationController(user);
                if(!userData?.DisplayName){
                    const {data} = await controller.getUserData();
                    setUserData(data);
                }
                if(!user.emailVerified){
                    await controller.sendVerificationMail();
                }
            }
        }
    });


    return(
        <>
            {
                user
                    ?
                    user.emailVerified ?
                        (userData?.DisplayName ? children : <RegisterSecondStepView user={user}/>)
                        :
                        <EmailVerification user={user}/>
                    :
                    <Authentication/>
            }
            {loading && <LoadingModal/>}
        </>
    );
}

export default AuthenticationWrapper;
