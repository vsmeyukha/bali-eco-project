import { FormEvent, ReactElement } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import BigBlueButton from "@/components/MainPageNotLoggedIn/BigBlueButton";
import AvatarBlock from "@/components/Profile/AvatarBlock";
import ProfileForm from "@/components/Profile/ProfileForm";

const Profile: React.FC = (): ReactElement => {
  return (
    <>
      <Header />
      <section className="bg-[#F5F5F5] 1440px:px-[152px] xl:px-[100px] lg:px-[50px] py-[60px]">
        <h2 className="font-oceanic-bold text-[32px] leading-[38px] text-[#00265F]">Настройки</h2>
        <h3 className="font-oceanic-bold text-[20px] leading-[24px] text-[#00265F] mt-[42px]">Ваши данные</h3>
        <div className="bg-white flex flex-col w-full rounded-[10px] mt-[24px]">
          <AvatarBlock />
          <ProfileForm />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Profile;