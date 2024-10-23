import { Metadata } from "next";
import SelectCountry from "@/app/_components/SelectCountry";
import ProfileUpdateForm from "@/app/_components/ProfileUpdateForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { Guest } from "@/app/_types/types";

export const metadata: Metadata = {
  title: "Update Profile",
};

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) throw new Error('You are not authenticated')
  const guest: Guest = await getGuest(session.user.email!);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <ProfileUpdateForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </ProfileUpdateForm>
    </div>
  );
}
