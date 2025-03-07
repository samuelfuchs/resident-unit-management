"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { theme, toggleTheme } = useTheme();

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const features = [
    {
      name: "Seamless Payments",
      description:
        "Integrated Stripe for fast, secure, and automated transactions—simplifying payments for both residents and property managers.",
      icon: CloudArrowUpIcon,
    },
    {
      name: "Role-Based Access Control (RBAC)",
      description:
        "Implemented a structured authentication system ensuring users only access what they need—enhancing security and usability.",
      icon: LockClosedIcon,
    },
    {
      name: "Backend Mastery",
      description:
        "Focused on writing scalable, well-structured backend code—leveraging authentication, middleware, and testing to improve reliability.",
      icon: ServerIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-white p-4 rounded-lg dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 text-3xl bg-white rounded-full p-1 shadow-lg dark:text-gray-300 dark:bg-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="flex justify-center">
              <Image
                src={modalImage}
                alt="Expanded Image"
                width={800}
                height={600}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
      <nav className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-indigo-400">
                  Unit Manager
                </span>
              </div>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
              <Link
                href="/signin"
                className="text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400"
              >
                Sign In
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {theme === "dark" ? (
                  <SunIcon className="w-6 h-6" />
                ) : (
                  <MoonIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div>
        <div className="relative isolate">
          <motion.svg
            aria-hidden="true"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 dark:stroke-gray-700
                   [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg
              x="50%"
              y={-1}
              className="overflow-visible fill-gray-50 dark:fill-gray-700"
            >
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </motion.svg>

          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:opacity-20"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
                  >
                    {/* <h1 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"> */}
                    <span className="text-gray-400 dark:text-gray-500">
                      Unit Manager:
                    </span>
                    <br />
                    <span className="text-indigo-500 dark:text-indigo-400">
                      Behind the Build
                    </span>
                    {/* </h1> */}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none dark:text-gray-300"
                  >
                    Instead of a polished landing page, I'm pulling back the
                    curtain on how I built this application—its challenges,
                    breakthroughs, and lessons.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none dark:text-gray-300"
                  >
                    Want to see it in action? Try the demo—sign in with a test
                    user and explore.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="mt-10 flex items-center gap-x-6"
                  >
                    <Link
                      href="/signin"
                      className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start Exploring
                    </Link>
                    <a
                      href="https://github.com/samuelfuchs"
                      className="text-sm/6 font-semibold text-gray-900 dark:text-gray-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Explore my work on GitHub{" "}
                      <span aria-hidden="true">→</span>
                    </a>
                  </motion.div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg border-2 border-indigo-500 border-opacity-0 hover:border-opacity-100 transition-all duration-200">
                      <Image
                        src="/images/office.jpeg"
                        alt="Developer workspace setup with dual monitor and laptop"
                        width={396}
                        height={528}
                        className="w-full h-full object-cover object-right cursor-pointer"
                        priority
                        onClick={() => openModal("/images/office.jpeg")}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg border-2 border-indigo-500 border-opacity-0 hover:border-opacity-100 transition-all duration-200">
                      <Image
                        src="/images/sketch.jpeg"
                        alt="Developer workspace setup with dual monitor and laptop"
                        width={396}
                        height={528}
                        className="w-full h-full object-cover object-left cursor-pointer scale-110"
                        priority
                        onClick={() => openModal("/images/sketch.jpeg")}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative overflow-hidden border-2 rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg border-indigo-500 border-opacity-0 hover:border-opacity-100 transition-all duration-200">
                      <Image
                        src={
                          theme === "dark"
                            ? "/images/diagram-dark.png"
                            : "/images/diagram.png"
                        }
                        alt="Developer workspace setup with dual monitor and laptop"
                        width={396}
                        height={528}
                        className="w-full h-full object-cover object-left cursor-pointer"
                        priority
                        onClick={() =>
                          openModal(
                            theme === "dark"
                              ? "/images/diagram-dark.png"
                              : "/images/diagram.png"
                          )
                        }
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative overflow-hidden border-2 rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg border-indigo-500 border-opacity-0 hover:border-opacity-100 transition-all duration-200">
                      <Image
                        src="/images/setup.jpeg"
                        alt="Developer workspace setup with dual monitor and laptop"
                        width={396}
                        height={528}
                        className="w-full h-full object-cover object-center scale-110 cursor-pointer"
                        priority
                        onClick={() => openModal("/images/setup.jpeg")}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg border-2 border-indigo-500 border-opacity-0 hover:border-opacity-100 transition-all duration-200">
                      <Image
                        src="/images/notebook.jpeg"
                        alt="Developer workspace setup with dual monitor and laptop"
                        width={396}
                        height={528}
                        className="w-full h-full object-cover object-left cursor-pointer scale-110"
                        priority
                        onClick={() => openModal("/images/notebook.jpeg")}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="overflow-hidden bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto">
            <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
              Explore the Code & API Documentation
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">
              Get the Code
            </p>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Dive into the codebase, experiment with the API, or connect with
              me for more insights.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Frontend Repo */}
            <div className="relative isolate overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Frontend Repository
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Built with TypeScript, Next.js, Tailwind CSS, Framer Motion, and
                more.
              </p>
              <a
                href="https://github.com/samuelfuchs/resident-unit-management"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-x-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-500 dark:hover:text-indigo-300 transition"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Backend Repo */}
            <div className="relative isolate overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Backend Repository
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Built using Node.js, Express, MongoDB, JWT, and more.
              </p>
              <a
                href="https://github.com/samuelfuchs/resident-unit-management-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-x-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-500 dark:hover:text-indigo-300 transition"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="relative isolate overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                API Documentation
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Download the Postman collection to explore and test the API.
              </p>
              <a
                href="/resident-management-system.postman_collection.json"
                download
                className="mt-4 inline-flex items-center gap-x-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-500 dark:hover:text-indigo-300 transition"
              >
                Download Postman Collection <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="overflow-hidden bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                  Full-Stack Application
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                  Bringing the Frontend and Backend Together
                </p>
                <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                  I built this project to deepen my understanding of new
                  technologies and tackle real-world challenges. From frontend
                  interactions to backend logic, every piece was designed to
                  work seamlessly.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 dark:text-gray-300lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute left-1 top-1 size-5 text-indigo-600 dark:text-indigo-400"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="flex justify-center items-center w-full h-full p-4 bg-gray-900/5 dark:bg-gray-800/5">
                <Image
                  src="/images/setup.jpeg"
                  alt="Developer workspace setup with dual monitor and laptop"
                  width={396}
                  height={528}
                  className="w-full h-auto object-cover object-center cursor-pointer scale-110 rounded-3xl 
                       border-2 border-indigo-500 border-opacity-0 hover:border-opacity-100 transition-all duration-200"
                  priority
                  onClick={() => openModal("/images/setup.jpeg")}
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 sm:rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Development Journey Section */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Development Journey
          </h2>
          <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 dark:text-gray-100 sm:text-5xl">
            Building with Modern Technologies
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <JourneyCard
              title="1. From Idea to Blueprint"
              description="Before writing a single line of code, I mapped out the core features, tech stack, and key challenges in my sketchbook. Some ideas evolved, others broke, and a few took a new direction—but that's part of the process."
              image="/images/sketch-full.jpeg"
              className="lg:col-span-2"
              onClick={() => openModal("/images/sketch-full.jpeg")}
            />
            <JourneyCard
              title="2. Frontend: The Interactive Layer"
              description="Developed with a robust tech stack, ensuring performance, scalability, and dynamic UI experiences."
              image="/images/frontend.jpeg"
              className="lg:col-span-2"
              onClick={() => openModal("/images/frontend.jpeg")}
              tags={[
                { text: "TypeScript", color: "blue-500" },
                { text: "Next.js", color: "green-500" },
                { text: "Tailwind CSS", color: "yellow-500" },
                { text: "Framer Motion", color: "purple-500" },
                { text: "React", color: "teal-500" },
                { text: "React Query", color: "red-500" },
                { text: "Stripe", color: "pink-500" },
                { text: "Axios", color: "orange-500" },
                { text: "NextAuth", color: "indigo-500" },
              ]}
            />
            <JourneyCard
              title="3. Backend: The Core Engine"
              description="Built with a solid architecture ensuring scalability, security, and performance. Implemented core features like authentication, data modeling, and Stripe integration with a strong focus on best practices."
              image="/images/backend.jpeg"
              className="lg:col-span-2"
              onClick={() => openModal("/images/backend.jpeg")}
              tags={[
                { text: "Node.js", color: "green-500" },
                { text: "Express", color: "blue-500" },
                { text: "MongoDB", color: "yellow-500" },
                { text: "Mongoose", color: "teal-500" },
                { text: "JWT", color: "red-500" },
                { text: "Bcrypt", color: "purple-500" },
                { text: "Stripe", color: "pink-500" },
                { text: "Jest", color: "indigo-500" },
                { text: "Supertest", color: "orange-500" },
              ]}
            />
            <JourneyCard
              title="5. Building This, Building Myself"
              description="I built this project end-to-end using an industry-standard tech stack to improve my skills in both frontend and backend development. I focused on new features to challenge myself and documented the journey to share my progress—and yes, I drank a lot of coffee. ☕️"
              image="/images/office.jpeg"
              className="lg:col-span-4"
              onClick={() => openModal("/images/office.jpeg")}
            />
            <JourneyCard
              title="6. What's Next?"
              description="The project isn't done yet. I'm refining features, improving UX, and plan to add AI soon. But it's ready to be showcased to the world."
              image="/images/setup.jpeg"
              className="lg:col-span-2"
              onClick={() => openModal("/images/setup.jpeg")}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-gray-900 pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
        <div className="bg-gray-900 dark:bg-gray-800 pb-20 sm:pb-24 xl:pb-0">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              {/* <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                <img
                  alt="Developer"
                  src="/developer-photo.jpg"
                  className="absolute inset-0 size-full rounded-2xl bg-gray-800 dark:bg-gray-700 object-cover shadow-2xl"
                />
              </div> */}
              <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg border-2 border-indigo-500 border-opacity-0 hover:border-opacity-100 transition-all duration-200">
                <Image
                  src="/images/profile.jpg"
                  alt="Developer workspace setup with dual monitor and laptop"
                  width={396}
                  height={528}
                  className="w-full h-full object-cover object-center cursor-pointer"
                  priority
                  onClick={() => openModal("/images/profile.jpg")}
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <figure className="relative isolate pt-6 sm:pt-12">
                <blockquote className="text-xl/8 font-semibold text-white dark:text-gray-200 sm:text-2xl/9">
                  <p>
                    "I build things with purpose—turning ideas into functional,
                    scalable solutions. Unit Manager wasn't just about property
                    management; it was an opportunity to push boundaries, solve
                    real-world challenges, and sharpen my technical skills.
                    Every project is a chance to learn, refine, and innovate—and
                    that's what keeps me coding."
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-base">
                  <div className="font-semibold text-white dark:text-gray-300">
                    Samuel Fuchs
                  </div>
                  <div className="mt-1 text-gray-400 dark:text-gray-500">
                    Software Developer
                  </div>
                </figcaption>
              </figure>

              <div className="mt-6 flex items-center gap-x-6">
                <a
                  href="https://github.com/samuelfuchs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-indigo-400 dark:text-indigo-300 hover:text-indigo-300 dark:hover:text-indigo-200"
                >
                  GitHub <span aria-hidden="true">→</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gersonsamuelfuchs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-indigo-400 dark:text-indigo-300 hover:text-indigo-300 dark:hover:text-indigo-200"
                >
                  LinkedIn <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JourneyCard = ({
  title,
  description,
  image,
  tags = [],
  className = "",
  onClick,
}: {
  title: string;
  description: string;
  tags?: { text: string; color: string }[];
  image: string;
  className?: string;
  onClick?: () => void;
}) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
      <img
        alt={title}
        src={image}
        className="h-80 object-cover cursor-pointer border-2 border-indigo-500 border-opacity-0 hover:border-opacity-100 transition-all duration-200 rounded-t-lg"
        onClick={onClick}
      />
      <div className="p-10 pt-4">
        <h3 className="text-sm/4 font-semibold text-indigo-600 dark:text-indigo-400">
          {title}
        </h3>
        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-gray-200">
          {description}
        </p>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-10 pb-4 z-30">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-semibold text-gray-900 dark:text-gray-100 bg-opacity-20 border bg-${tag.color} border-${tag.color} rounded-md hover:bg-${tag.color} hover:text-white transition-all duration-200`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      )}
    </div>
    <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 dark:ring-white/10" />
  </div>
);

export default LandingPage;
