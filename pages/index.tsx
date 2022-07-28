/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { userLogin } from '../service';
import LoginWrapper from "./login";


const Home: NextPage = () => {
  const router = useRouter()
  const login = (event: any) => {
    event.preventDefault();
    event.target.username.value
    userLogin(event.target.username.value, event.target.password.value).then(async (response) => {
      console.log(response)
      if (response.status === 200) {
        await localStorage.setItem("accessToken", response.data.data.token);
        router.push('/dashboard');
      };
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <LoginWrapper>
      <div className='container-fluid p-0'>
        <div className='d-flex align-items-stretch login-wrapper'>
          <div className='login-vid' aria-hidden="true">
            <video controls autoPlay muted loop className='login-video'>
              <source src="images/login-video.mp4" type="video/mp4" />
            </video>
            <div className='login-vid-overlay'></div>
          </div>
          <div className='login-block d-flex  flex-column justify-content-center'>
            <div className='login-inner'>
              <div className='app-logo justify-content-center d-flex align-items-center'>
                <img src="images/freshbee.png" alt='Freshbee logo' />
                <div aria-hidden="true"><span className='font-600'>Fresh</span><span className='font-700'>BEE</span></div>
              </div>
              <div className='login-text'>
                <p className='login-text1'>Welcome Back !</p>
                <p className='login-text2'>Sign in to continue to FreshBEE</p>
              </div>
              <form className='d-flex flex-column' onSubmit={login}>
                <div>
                  <label htmlFor='username' className='form-label'>User Name</label>
                  <input type="text" className="form-control" id="username" placeholder='User Name' name="username" />
                </div>
                <div>
                  <label htmlFor='password' className='form-label'>Password</label>
                  <input type="password" className="form-control" id="password" placeholder='**********' name="password" />
                </div>
                <div className="form-group form-check mb-4">
                  <input type="checkbox" value="" id="check1" />
                  <label htmlFor='check1'>
                    Keep me logged in
                  </label>
                </div>
                <button type="submit" className='btn btn-primary'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LoginWrapper>
  )
}
export default Home