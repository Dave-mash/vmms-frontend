"use client";

const CustomInput = (props: any) => {
  const { type, label, options, name } = props;
  // return <input className="text-[#3D454F]" {...props} />
  return (
    <>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-bold leading-6 text-[#3D454F]"
        >
          {label}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
          </div> */}
          {
            type === 'select' ? <select className="w-full text-[#3D454F] p-[.5rem]" name={name} onChange={props?.onChange}>
              <option>Select Storage</option>
              {
                options?.map((_name: string) => (
                  <option key={_name} value={_name}>{_name}</option>
                ))
              }
            </select> : <input
              {...props}
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-[#3D454F] ring-1 ring-inset ring-[#D9D9D9] placeholder:[#3D454F] focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          }
        </div>
      </div>
    </>
  );
};

export default CustomInput;
