import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const About = () => {
  const profileData = {
    name: "UTSAB ADHIKARI",
    title: "Full Stack Developer",
    address: "Gokarna-3, Kathmandu, Nepal",
    phoneNumber: "9860516590",
    email: "utssabad10@gmail.com",
    description:
      "I just finished studying computers💻💻 \n, and I really like making websites🌐🌐 using MERN. \n Also, I'm a big fan of playing football! ⚽⚽ . \nIntrovert too 😁😁",
    github: "https://github.com/utsab1231",
    linkedin: "https://www.linkedin.com/in/utsab01",
    facebook: "https://www.facebook.com/utsab.adhikari.35",
    instagram: "https://www.instagram.com/uts_ab",
    whatsapp: "https://wa.me/9860516590",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#051923]">
      <div className="max-w-3xl mx-auto bg-[#8d99ae] p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <img
            src="https://cdn.githubraw.com/utsab1231/imagestorage/main/gif-photo.gif"
            alt="Profile"
            className=" w-48 h-48 object-cover mb-4 mx-auto"
          />
          <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
          <p className="text-black font-semibold">{profileData.title}</p>
        </div>
        <div className="mb-4 flex items-center justify-center">
          <FaMapMarkerAlt className="text-lg text-black mr-2" />
          <span className="text-black">{profileData.address}</span>
        </div>
        <div className="mb-4 flex items-center justify-center">
          <FaPhone className="text-lg text-black mr-2" />
          <span className="text-black font-semibold">
            {profileData.phoneNumber}
          </span>
        </div>
        <div className="mb-6 flex items-center justify-center">
          <FaEnvelope className="text-lg text-black mr-2" />
          <a
            href={`mailto:${profileData.email}`}
            className="text-black font-semibold hover:text-gray-900"
          >
            {profileData.email}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <hr className="border border-dotted border-black" />
            <h3 className="text-lg font-semibold mb-2 text-center">
              PROFESSIONAL LINKS
            </h3>
            <div className="flex items-center justify-center mb-4">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <FaGithub className="text-2xl text-gray-600 hover:text-gray-900" />
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl text-gray-600 hover:text-gray-900" />
              </a>
            </div>
          </div>
          <div>
            <hr className="border border-dotted border-black" />
            <h3 className="text-lg font-semibold mb-2 text-center">Socials</h3>
            <div className="flex items-center justify-center mb-4">
              <a
                href={profileData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <FaFacebook className="text-2xl text-gray-600 hover:text-gray-900" />
              </a>
              <a
                href={profileData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <FaInstagram className="text-2xl text-gray-600 hover:text-gray-900" />
              </a>
              <a
                href={profileData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-2xl text-gray-600 hover:text-gray-900" />
              </a>
            </div>
          </div>
        </div>
        <div className="mb-8 text-[#5b1f2e] font-semibold text-xl ">
          <hr className="mb-1 border-2 border-black" />
          <p>{profileData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
