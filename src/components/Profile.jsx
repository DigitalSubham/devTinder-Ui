import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaCode,
  FaPencilAlt,
  FaSave,
  FaTimes,
  FaPlus,
  FaTrash,
  FaCamera,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  // const [userData, setUserData] = useState(initialUserData);
  const { userData } = useSelector((store) => store.user);
  const [formData, setFormData] = useState(userData);
  const [activeTab, setActiveTab] = useState("about");
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechStackChange = (e, index) => {
    const newTechStack = [...formData.techStack];
    newTechStack[index] = e.target.value;
    setFormData({
      ...formData,
      techStack: newTechStack,
    });
  };

  const addTechStack = () => {
    setFormData({
      ...formData,
      techStack: [...formData.techStack, ""],
    });
  };

  const removeTechStack = (index) => {
    const newTechStack = [...formData.techStack];
    newTechStack.splice(index, 1);
    setFormData({
      ...formData,
      techStack: newTechStack,
    });
  };

  const handleExperienceChange = (e, index, field) => {
    const newExperience = [...formData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: e.target.value,
    };
    setFormData({
      ...formData,
      experience: newExperience,
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          id: `exp${formData.experience.length + 1}`,
          role: "",
          company: "",
          duration: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    setFormData({
      ...formData,
      experience: newExperience,
    });
  };

  const handleEducationChange = (e, index, field) => {
    const newEducation = [...formData.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: e.target.value,
    };
    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          id: `edu${formData.education.length + 1}`,
          degree: "",
          institution: "",
          year: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const handleProjectChange = (e, index, field) => {
    const newProjects = [...formData.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: e.target.value,
    };
    setFormData({
      ...formData,
      projects: newProjects,
    });
  };

  const handleProjectTechChange = (e, projectIndex, techIndex) => {
    const newProjects = [...formData.projects];
    const newTechUsed = [...newProjects[projectIndex].techUsed];
    newTechUsed[techIndex] = e.target.value;
    newProjects[projectIndex] = {
      ...newProjects[projectIndex],
      techUsed: newTechUsed,
    };
    setFormData({
      ...formData,
      projects: newProjects,
    });
  };

  const addProjectTech = (projectIndex) => {
    const newProjects = [...formData.projects];
    newProjects[projectIndex] = {
      ...newProjects[projectIndex],
      techUsed: [...newProjects[projectIndex].techUsed, ""],
    };
    setFormData({
      ...formData,
      projects: newProjects,
    });
  };

  const removeProjectTech = (projectIndex, techIndex) => {
    const newProjects = [...formData.projects];
    const newTechUsed = [...newProjects[projectIndex].techUsed];
    newTechUsed.splice(techIndex, 1);
    newProjects[projectIndex] = {
      ...newProjects[projectIndex],
      techUsed: newTechUsed,
    };
    setFormData({
      ...formData,
      projects: newProjects,
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          id: `proj${formData.projects.length + 1}`,
          name: "",
          description: "",
          techUsed: [""],
          link: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    const newProjects = [...formData.projects];
    newProjects.splice(index, 1);
    setFormData({
      ...formData,
      projects: newProjects,
    });
  };

  const handleSave = async () => {
    console.log("formData", formData, userData);
    dispatch(addUser(formData));
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { ...formData },
        { withCredentials: true }
      );
    } catch (error) {}
    setIsEditing(false);
    setShowSavedMessage(true);
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {userData && (
        <div className="min-h-screen bg-gray-900 pt-20 pb-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="relative bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
              {/* Cover Photo */}
              <div className="h-48 bg-gradient-to-r from-purple-900 to-gray-800"></div>

              {/* Profile Picture and Basic Info */}
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 relative">
                  <div className="relative">
                    <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-gray-800 bg-gray-700 flex items-center justify-center overflow-hidden">
                      <FaCode className="text-5xl text-purple-400" />
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 text-white hover:bg-purple-700 transition-colors">
                        <FaCamera className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-700 text-white text-2xl font-bold px-3 py-1 rounded-md w-full sm:w-auto"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold text-white">
                        {userData?.name}
                      </h1>
                    )}

                    <div className="flex items-center justify-center sm:justify-start mt-1 text-gray-300">
                      <FaMapMarkerAlt className="mr-1 text-purple-400" />
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="bg-gray-700 text-white text-sm px-2 py-1 rounded-md w-full sm:w-auto"
                        />
                      ) : (
                        <span>{userData?.location}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-center sm:justify-start mt-2 space-x-3">
                      <a
                        href={`https://github.com/${userData?.githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                      {userData?.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${userData?.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FaLinkedin className="h-5 w-5" />
                        </a>
                      )}
                      {userData?.twitter && (
                        <a
                          href={`https://twitter.com/${userData?.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FaTwitter className="h-5 w-5" />
                        </a>
                      )}
                      {userData?.website && (
                        <a
                          href={userData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FaGlobe className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Edit/Save Buttons */}
                  <div className="mt-4 sm:mt-0">
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <motion.button
                          className="flex items-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          onClick={handleSave}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaSave className="h-4 w-4" />
                          <span>Save</span>
                        </motion.button>
                        <motion.button
                          className="flex items-center space-x-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                          onClick={handleCancel}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTimes className="h-4 w-4" />
                          <span>Cancel</span>
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        className="flex items-center space-x-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                        onClick={() => setIsEditing(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPencilAlt className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Message */}
            <AnimatePresence>
              {showSavedMessage && (
                <motion.div
                  className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Profile saved successfully!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Tabs */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="flex border-b border-gray-700">
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "about"
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "experience"
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("experience")}
                >
                  Experience
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "education"
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "projects"
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  Projects
                </button>
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === "about" && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">
                      About
                    </h2>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData?.bio}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-white rounded-lg p-3 min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-gray-300">{userData?.bio}</p>
                    )}

                    <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-300">{userData.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          GitHub Username
                        </label>
                        {isEditing ? (
                          <div className="flex">
                            <span className="bg-gray-600 text-gray-300 px-3 py-2 rounded-l-lg">
                              github.com/
                            </span>
                            <input
                              type="text"
                              name="githubUsername"
                              value={formData.githubUsername}
                              onChange={handleInputChange}
                              className="flex-1 bg-gray-700 text-white rounded-r-lg px-3 py-2"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-300">
                            github.com/{userData.githubUsername}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Website
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                            placeholder="https://yourwebsite.com"
                          />
                        ) : userData.website ? (
                          <a
                            href={userData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            {userData.website}
                          </a>
                        ) : (
                          <p className="text-gray-500">Not provided</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          LinkedIn
                        </label>
                        {isEditing ? (
                          <div className="flex">
                            <span className="bg-gray-600 text-gray-300 px-3 py-2 rounded-l-lg">
                              linkedin.com/in/
                            </span>
                            <input
                              type="text"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleInputChange}
                              className="flex-1 bg-gray-700 text-white rounded-r-lg px-3 py-2"
                            />
                          </div>
                        ) : userData.linkedin ? (
                          <p className="text-gray-300">
                            linkedin.com/in/{userData.linkedin}
                          </p>
                        ) : (
                          <p className="text-gray-500">Not provided</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Twitter
                        </label>
                        {isEditing ? (
                          <div className="flex">
                            <span className="bg-gray-600 text-gray-300 px-3 py-2 rounded-l-lg">
                              twitter.com/
                            </span>
                            <input
                              type="text"
                              name="twitter"
                              value={formData.twitter}
                              onChange={handleInputChange}
                              className="flex-1 bg-gray-700 text-white rounded-r-lg px-3 py-2"
                            />
                          </div>
                        ) : userData.twitter ? (
                          <p className="text-gray-300">
                            twitter.com/{userData.twitter}
                          </p>
                        ) : (
                          <p className="text-gray-500">Not provided</p>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                      Tech Stack
                    </h3>
                    {isEditing ? (
                      <div className="space-y-2">
                        {formData.techStack.map((tech, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="text"
                              value={tech}
                              onChange={(e) => handleTechStackChange(e, index)}
                              className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2"
                            />
                            <button
                              type="button"
                              onClick={() => removeTechStack(index)}
                              className="p-2 text-red-400 hover:text-red-300"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addTechStack}
                          className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 mt-2"
                        >
                          <FaPlus className="h-3 w-3" />
                          <span>Add Technology</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userData.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 text-sm text-gray-400">
                      <p>Member since {formatDate(userData.createdAt)}</p>
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === "experience" && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">
                      Work Experience
                    </h2>

                    <div className="space-y-6">
                      {(isEditing
                        ? formData.experience
                        : userData.experience
                      ).map((exp, index) => (
                        <div
                          key={exp.id}
                          className={`${
                            isEditing ? "bg-gray-700 p-4 rounded-lg" : ""
                          }`}
                        >
                          {isEditing ? (
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                  Role
                                </label>
                                <input
                                  type="text"
                                  value={exp.role}
                                  onChange={(e) =>
                                    handleExperienceChange(e, index, "role")
                                  }
                                  className="w-full bg-gray-600 text-white rounded-lg px-3 py-2"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                  Company
                                </label>
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) =>
                                    handleExperienceChange(e, index, "company")
                                  }
                                  className="w-full bg-gray-600 text-white rounded-lg px-3 py-2"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                  Duration
                                </label>
                                <input
                                  type="text"
                                  value={exp.duration}
                                  onChange={(e) =>
                                    handleExperienceChange(e, index, "duration")
                                  }
                                  className="w-full bg-gray-600 text-white rounded-lg px-3 py-2"
                                  placeholder="e.g. 2020 - Present"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                  Description
                                </label>
                                <textarea
                                  value={exp.description}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      e,
                                      index,
                                      "description"
                                    )
                                  }
                                  className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 min-h-[80px]"
                                />
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => removeExperience(index)}
                                  className="flex items-center space-x-1 text-red-400 hover:text-red-300"
                                >
                                  <FaTrash className="h-4 w-4" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex">
                              <div className="mr-4 mt-1">
                                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                                  <FaBriefcase className="text-purple-400" />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-white">
                                  {exp.role}
                                </h3>
                                <p className="text-gray-300">{exp.company}</p>
                                <p className="text-sm text-gray-400">
                                  {exp.duration}
                                </p>
                                <p className="mt-2 text-gray-300">
                                  {exp.description}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {isEditing && (
                        <motion.button
                          type="button"
                          onClick={addExperience}
                          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 mt-4 px-4 py-2 border border-dashed border-gray-700 rounded-lg w-full justify-center"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <FaPlus className="h-4 w-4" />
                          <span>Add Experience</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                )}

                {/* Education Tab */}
                {activeTab === "education" && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">
                      Education
                    </h2>

                    <div className="space-y-6">
                      {(isEditing
                        ? formData.education
                        : userData.education
                      ).map((edu, index) => (
                        <div
                          key={edu.id}
                          className={`${
                            isEditing ? "bg-gray-700 p-4 rounded-lg" : ""
                          }`}
                        >
                          {isEditing ? (
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                  Degree
                                </label>
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) =>
                                    handleEducationChange(e, index, "degree")
                                  }
                                  className="w-full bg-gray-600 text-white rounded-lg px-3 py-2"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                  Institution
                                </label>
                                <input
                                  type="text"
                                  value={edu.institution}
                                  onChange={(e) =>
                                    handleEducationChange(
                                      e,
                                      index,
                                      "institution"
                                    )
                                  }
                                  className="w-full bg-gray-600 text-white rounded-lg px-3 py-2"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                  Year
                                </label>
                                <input
                                  type="text"
                                  value={edu.year}
                                  onChange={(e) =>
                                    handleEducationChange(e, index, "year")
                                  }
                                  className="w-full bg-gray-600 text-white rounded-lg px-3 py-2"
                                />
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => removeEducation(index)}
                                  className="flex items-center space-x-1 text-red-400 hover:text-red-300"
                                >
                                  <FaTrash className="h-4 w-4" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex">
                              <div className="mr-4 mt-1">
                                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                                  <FaGraduationCap className="text-purple-400" />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-white">
                                  {edu.degree}
                                </h3>
                                <p className="text-gray-300">
                                  {edu.institution}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {edu.year}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {isEditing && (
                        <motion.button
                          type="button"
                          onClick={addEducation}
                          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 mt-4 px-4 py-2 border border-dashed border-gray-700 rounded-lg w-full justify-center"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <FaPlus className="h-4 w-4" />
                          <span>Add Education</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">
                      Projects
                    </h2>

                    <div className="space-y-6">
                      {(isEditing ? formData.projects : userData.projects).map(
                        (project, index) => (
                          <div
                            key={project.id}
                            className={`${
                              isEditing
                                ? "bg-gray-700 p-4 rounded-lg"
                                : "bg-gray-700 rounded-lg p-4"
                            }`}
                          >
                            {isEditing ? (
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Project Name
                                  </label>
                                  <input
                                    type="text"
                                    value={project.name}
                                    onChange={(e) =>
                                      handleProjectChange(e, index, "name")
                                    }
                                    className="w-full bg-gray-600 text-white rounded-lg px-3 py-2"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Description
                                  </label>
                                  <textarea
                                    value={project.description}
                                    onChange={(e) =>
                                      handleProjectChange(
                                        e,
                                        index,
                                        "description"
                                      )
                                    }
                                    className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 min-h-[80px]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Technologies Used
                                  </label>
                                  <div className="space-y-2">
                                    {project.techUsed.map((tech, techIndex) => (
                                      <div
                                        key={techIndex}
                                        className="flex items-center space-x-2"
                                      >
                                        <input
                                          type="text"
                                          value={tech}
                                          onChange={(e) =>
                                            handleProjectTechChange(
                                              e,
                                              index,
                                              techIndex
                                            )
                                          }
                                          className="flex-1 bg-gray-600 text-white rounded-lg px-3 py-2"
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeProjectTech(index, techIndex)
                                          }
                                          className="p-2 text-red-400 hover:text-red-300"
                                        >
                                          <FaTrash className="h-4 w-4" />
                                        </button>
                                      </div>
                                    ))}
                                    <button
                                      type="button"
                                      onClick={() => addProjectTech(index)}
                                      className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 mt-1"
                                    >
                                      <FaPlus className="h-3 w-3" />
                                      <span>Add Technology</span>
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Project Link
                                  </label>
                                  <input
                                    type="url"
                                    value={project.link}
                                    onChange={(e) =>
                                      handleProjectChange(e, index, "link")
                                    }
                                    className="w-full bg-gray-600 text-white rounded-lg px-3 py-2"
                                    placeholder="https://github.com/username/project"
                                  />
                                </div>
                                <div className="flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => removeProject(index)}
                                    className="flex items-center space-x-1 text-red-400 hover:text-red-300"
                                  >
                                    <FaTrash className="h-4 w-4" />
                                    <span>Remove</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="flex justify-between items-start">
                                  <h3 className="text-lg font-medium text-white">
                                    {project.name}
                                  </h3>
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                                    >
                                      <FaGithub className="mr-1 h-4 w-4" />
                                      View Project
                                    </a>
                                  )}
                                </div>
                                <p className="mt-2 text-gray-300">
                                  {project.description}
                                </p>
                                <div className="mt-3">
                                  <div className="flex flex-wrap gap-2">
                                    {project.techUsed.map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className="px-2 py-1 bg-gray-600 text-gray-300 rounded-md text-xs"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}

                      {isEditing && (
                        <motion.button
                          type="button"
                          onClick={addProject}
                          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 mt-4 px-4 py-2 border border-dashed border-gray-700 rounded-lg w-full justify-center"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <FaPlus className="h-4 w-4" />
                          <span>Add Project</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
