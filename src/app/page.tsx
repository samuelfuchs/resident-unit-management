"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const features = [
    {
      name: "Role-Based Access Control",
      description:
        "Security shouldn't be complicated. I built a role-based system where admins, staff, and residents get exactly what they need—nothing more, nothing less.",
      icon: LockClosedIcon,
    },
    {
      name: "Real-time Notifications",
      description:
        "No more chasing emails. With real-time alerts, payments, maintenance requests, and announcements reach the right people instantly.",
      icon: ServerIcon,
    },
    {
      name: "Payment Integration",
      description:
        "Paying rent should be effortless. Stripe integration makes transactions seamless, secure, and hassle-free—for both residents and managers.",
      icon: CloudArrowUpIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full bg-white p-2 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 text-3xl bg-white rounded-full p-1 shadow-lg"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <Image
              src={modalImage}
              alt="Expanded Image"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  Unit Manager
                </span>
              </div>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                href="/signin"
                className="text-sm/6 font-semibold text-indigo-600"
              >
                Sign In
                <span aria-hidden="true">&rarr;</span>
              </Link>
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
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 
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
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
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
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
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
                    <span className="text-gray-400">Unit Manager:</span>
                    <br />
                    <span className="text-indigo-500">Behind the Build</span>
                    {/* </h1> */}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none"
                  >
                    Instead of a polished landing page, I'm pulling back the
                    curtain on how I built this application—its challenges,
                    breakthroughs, and lessons.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none"
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
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start Exploring
                    </Link>
                    <a
                      href="https://github.com/samuelfuchs"
                      className="text-sm/6 font-semibold text-gray-900"
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
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg">
                      <Image
                        src="/images/sketch.jpeg"
                        alt="Developer workspace setup with dual monitor and laptop"
                        width={396}
                        height={528}
                        className="w-full h-full object-cover object-left scale-110 brightness-110 cursor-pointer"
                        priority
                        onClick={() => openModal("/images/sketch.jpeg")}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    {/* <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div> */}
                    <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg">
                      <Image
                        src="/images/diagram.png"
                        alt="Developer workspace setup with dual monitor and laptop"
                        width={396}
                        height={528}
                        className="w-full h-full object-cover object-left cursor-pointer"
                        priority
                        onClick={() => openModal("/images/diagram.png")}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-gray-900/5 shadow-lg">
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
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
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

      {/* Feature Section */}
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-indigo-600">
                  Built for efficiency
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Solving Real Problems with Smart Features
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  I set out to tackle clunky systems, missed payments, and lost
                  requests—common headaches in property management. Unit Manager
                  is built to remove these pain points and simplify everything.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute left-1 top-1 size-5 text-indigo-600"
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
              <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                />
                <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                  <img
                    alt="Unit Manager Dashboard"
                    src="/dashboard-screenshot.png"
                    width={2432}
                    height={1442}
                    className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Journey Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Development Journey
          </h2>
          <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            Building with Modern Technologies
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <JourneyCard
              title="1. From Idea to Blueprint"
              description="Before a single line of code, I sketched everything—features, users, tech stack. Planning saved me… or so I thought. Some ideas evolved, others broke, and a few took a whole new direction."
              image="/images/sketch-full.jpeg"
              className="lg:col-span-2"
              onClick={() => openModal("/images/sketch-full.jpeg")}
            />
            <JourneyCard
              title="2. Setting Up the Project"
              description="Setting up Next.js, Tailwind, and authentication laid the foundation for everything that followed."
              image="/images/sketch-full.jpeg"
              className="lg:col-span-4"
              onClick={() => openModal("/images/sketch-full.jpeg")}
            />
            <JourneyCard
              title="3. Authentication: More Than Just Logins"
              description="One of the first big challenges was getting authentication right—ensuring the right people had access while keeping it seamless. Role-based control (RBAC) became the backbone of the system."
              image="/images/dashboard-postman.png"
              className="lg:col-span-3"
              onClick={() => openModal("/images/dashboard-postman.png")}
            />
            <JourneyCard
              title="4. The First Deployment"
              description="Deploying the first version felt surreal. Even with bugs and missing features, seeing it live made everything real. Each update since then has made it smoother and smarter."
              image="/auth-screenshot.png"
              className="lg:col-span-3"
              onClick={() => openModal("/images/auth-screenshot.png")}
            />
            <JourneyCard
              title="5. Building This, Building Myself"
              description="This project isn't just about code—it's about growth. As I built Unit Manager, I pushed my own limits, learned new skills, and shaped my perspective on problem-solving."
              image="/auth-screenshot.png"
              className="lg:col-span-4"
              onClick={() => openModal("/images/auth-screenshot.png")}
            />
            <JourneyCard
              title="6. What's Next?"
              description="Software is never really 'done.' There's always a next step. Unit Manager is evolving, and I can't wait to see where it goes next."
              image="/auth-screenshot.png"
              className="lg:col-span-2"
              onClick={() => openModal("/images/auth-screenshot.png")}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
        <div className="bg-gray-900 pb-20 sm:pb-24 xl:pb-0">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                <img
                  alt="Developer"
                  src="/developer-photo.jpg"
                  className="absolute inset-0 size-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <figure className="relative isolate pt-6 sm:pt-12">
                <blockquote className="text-xl/8 font-semibold text-white sm:text-2xl/9">
                  <p>
                    "I build things. Sometimes they work, sometimes they
                    don't—but that's part of the process. Unit Manager wasn't
                    just about property management; it was about pushing limits,
                    solving problems, and learning along the way. And that's
                    what keeps me coding."
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-base">
                  <div className="font-semibold text-white">Samuel Fuchs</div>
                  <div className="mt-1 text-gray-400">Software Developer</div>
                </figcaption>
              </figure>

              <div className="mt-6 flex items-center gap-x-6">
                <a
                  href="https://github.com/samuelfuchs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  GitHub <span aria-hidden="true">→</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gersonsamuelfuchs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
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
  className = "",
  onClick,
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
  onClick?: () => void;
}) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-px rounded-lg bg-white" />
    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
      <img
        alt={title}
        src={image}
        className="h-80 object-cover cursor-pointer"
        onClick={onClick}
      />
      <div className="p-10 pt-4">
        <h3 className="text-sm/4 font-semibold text-indigo-600">{title}</h3>
        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
          {description}
        </p>
      </div>
    </div>
    <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
  </div>
);

export default LandingPage;
