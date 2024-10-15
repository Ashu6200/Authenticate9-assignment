import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../context/userSlice";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const schema = yup.object({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        try {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            if (!Array.isArray(users)) {
                throw new Error("Users is not an array");
            }
            let user = users.find(user => user.email === data.email);
            if (!user) {
                user = { email: data.email, watchList: [{ listName: "My Watchlist", listMovies: [] }] };
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
            }
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            dispatch(login(user));
            navigate('/');
            toast.success("Successfully logged in");
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Login failed: " + error.message);
        }
    };

    return (
        <section className='w-full h-lvh'>
            <div className='flex items-center justify-center w-full h-full'>
                <form className='min-w-[320px] cardGlass p-4 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-1'>
                        <label className='text-white text-lg font-semibold'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter your email address'
                            className='w-full outline-none border-none p-2 rounded-lg'
                            {...register("email")}
                        />
                        {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                    </div>
                    <button className='w-full p-2 bg-[#6126DD] rounded font-medium text-sm text-white text-center'>
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
