import { TEInput, TERipple } from "tw-elements-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/auth/useAuth"
import { useDispatch } from "react-redux"
import { finishLoading, initLoading } from "../store/slices/loadingSlice"


const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email('Email has an invalid format'),
    password: yup.string().required().min(6, 'Password length must be at least 6 characters'),
    confirmPassword: yup.string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required()

export default function RegisterPage() {
  const dispatch = useDispatch()
  const { doRegister } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    dispatch(initLoading())
    doRegister(data.firstName, data.lastName, data.email, data.password)
    dispatch(finishLoading())
    navigate('/')
  }

  return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit(onSubmit)}>

              <div>{errors.firstName?.message}</div>
              <TEInput
                type="text"
                label="First Name"
                className="mb-6"
                size="lg"
                {...register("firstName")}
              ></TEInput>

              <span>{errors.lastName?.message}</span>
              <TEInput
                type="text"
                label="Last Name"
                className="mb-6"
                size="lg"
                {...register("lastName")}
              ></TEInput>

              {/* <!-- Email input --> */}
              <div>{errors.email?.message}</div>
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
                {...register("email")}
              ></TEInput>

              {/* <!--Password input--> */}
              <div>{errors.password?.message}</div>
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                {...register("password")}
              ></TEInput>
              
              <div>{errors.confirmPassword?.message}</div>
              <TEInput
                type="password"
                label="Confirm Password"
                className="mb-6"
                size="lg"
                {...register("confirmPassword")}
              ></TEInput>

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Register
                  </button>
                </TERipple>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Have an account?{" "}
                  <Link
                    to="/login"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
