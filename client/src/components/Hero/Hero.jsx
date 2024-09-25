
const Hero = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <section className="pt-24 pb-10 bg-white">
        <div className="px-12 flex flex-col md:flex-row  justify-center items-center gap-16">
          <div className="w-full mx-auto text-left md:w-1/2 md:text-center">
           

            {/* new */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center lg:pt-0">
              <p className="mx-auto -mt-4 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6">
                Welcome to{" "}
                <span className="border-b border-dotted border-slate-300">
                  Learnic
                </span>
              </p>
              <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                <span className="inline-block">
                  Find study
                  <span className="relative whitespace-nowrap text-blue-600">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 418 42"
                      className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
                      preserveAspectRatio="none"
                    >
                      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                    </svg>
                    <span className="relative">Resources</span>
                  </span>
                </span>
                <span className="inline-block">with Tutors</span>
              </h1>
              <p className="mx-auto mt-9 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6">
                <span className="inline-block">
                  Experienced tutors offer personalized,
                </span>
                <span className="inline-block">
                  dedicated support for student success.
                </span>
              </p>
              <div className="mt-12 flex flex-col justify-center gap-y-5 sm:mt-10 sm:flex-row sm:gap-y-0 sm:gap-x-6">
                <div className="relative inline-flex group">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <p
                    className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    Are you ready ?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mx-auto text-center md:w-1/2">
            <div className="relative z-0 w-full">
              <div className="relative overflow-hidden shadow-2xl">
                <div className="flex items-center flex-none px-4 bg-gradient-to-r from-green-500 to-sky-500 rounded-b-none h-11 rounded-xl">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 border-2 border-white rounded-full" />
                    <div className="w-3 h-3 border-2 border-white rounded-full" />
                    <div className="w-3 h-3 border-2 border-white rounded-full" />
                  </div>
                </div>
                <img src="https://i.ibb.co/gRNtcL1/Blue-and-Pink-modern-technology-website-template.png" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
