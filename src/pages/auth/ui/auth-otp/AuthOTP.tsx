import { FC } from "react";

import { Otp } from "@/widgets/otp";
import { useOTP } from "../../lib/hooks";

const AuthOTP: FC = () => {
  const { otp, setOtp, setIsResendable, phone } = useOTP();

  return (
    <>
      <h2 className="heading-title md:heading-2 mb-3">Введите код из СМС</h2>
      <p className="mb-12 text-center">
        Мы отправили код подтверждения на номер {phone}
      </p>
      <Otp
        value={otp}
        onChange={(value) => setOtp(value)}
        resendable={setIsResendable}
        phone_number={phone}
      />
    </>
  );
};

export default AuthOTP;
