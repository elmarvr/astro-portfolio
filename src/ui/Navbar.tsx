interface NavLinkProps
  extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

const NavLink = (props: NavLinkProps) => {
  return <a {...props} className="text-sm transition hover:text-fuchsia-500 active:text-fuchsia-500" />;
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-10 flex items-center justify-between w-full px-4 py-4 border-b h-15 sm:px-12 border-b-gray-800 backdrop-blur">
      E
      <div className="flex gap-4">
        <NavLink href="#hero">Home</NavLink>
        <NavLink href="#skills">Skills</NavLink>
        <NavLink href="#work">Projects</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

//     <>
//       <nav className="fixed top-0 z-10 flex items-center justify-between w-full px-4 py-4 border-b h-15 sm:px-12 border-b-gray-800 backdrop-blur">
//         <div className="flex items-center gap-2 text-lg text-fuchsia-500">{props.logo}</div>

//         <div className="hidden sm:flex">
//           <div className="flex gap-8">{props.children}</div>
//         </div>

//         <button onClick={() => setIsOpen(true)} className="flex flex-col gap-2 sm:hidden">
//           <Line />
//           <Line />
//           <Line />
//         </button>
//       </nav>

//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               onClick={() => setIsOpen(false)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed top-0 w-full h-full sm:hidden backdrop-blur"
//             />
//             <motion.aside
//               onClick={() => setIsOpen(false)}
//               initial={{ x: "100% " }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween" }}
//               className="fixed top-0 right-0 flex flex-col items-center justify-center w-3/4 max-w-[300px] h-full gap-8 sm:hidden bg-slate-800 p-4"
//             >
//               <button className="absolute w-8 h-8 top-4 right-4">
//                 <Line className="transform rotate-45"></Line>
//                 <Line className="transform -rotate-45 -translate-y-0.5"></Line>
//               </button>

//               {props.children}
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };
