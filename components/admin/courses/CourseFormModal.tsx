// "use client";

// import { useState, useEffect } from "react";
// import { X, Plus, Minus, Save, UserPlus } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Course } from "@/lib/mock-data";

// interface CourseFormModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (course: Omit<Course, "id" | "slug">) => void;
//   initialData?: Course;
// }

// const defaultFormData = {
//   title: "",
//   department: "",
//   description: "",
//   intake: 60,
//   coordinators: [""],
// };

// export function CourseFormModal({
//   isOpen,
//   onClose,
//   onSave,
//   initialData,
// }: CourseFormModalProps) {
//   const [formData, setFormData] = useState<Omit<Course, "id" | "slug">>(
//     initialData
//       ? {
//           title: initialData.title,
//           department: initialData.department,
//           description: initialData.description,
//           intake: initialData.intake,
//           coordinators: [...initialData.coordinators],
//         }
//       : defaultFormData
//   );

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         title: initialData.title,
//         department: initialData.department,
//         description: initialData.description,
//         intake: initialData.intake,
//         coordinators: [...initialData.coordinators],
//       });
//     } else {
//       setFormData(defaultFormData);
//     }
//   }, [initialData, isOpen]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "intake" ? parseInt(value) : value,
//     }));
//   };

//   const addCoordinator = () => {
//     setFormData((prev) => ({
//       ...prev,
//       coordinators: [...prev.coordinators, ""],
//     }));
//   };

//   const removeCoordinator = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       coordinators: prev.coordinators.filter((_, i) => i !== index),
//     }));
//   };

//   const updateCoordinator = (index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       coordinators: prev.coordinators.map((coord, i) =>
//         i === index ? value : coord
//       ),
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Filter out empty coordinators
//     const filteredData = {
//       ...formData,
//       coordinators: formData.coordinators.filter((c) => c.trim() !== ""),
//     };
//     onSave(filteredData);
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm dark:bg-black/80"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//             <motion.div
//               className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 10 }}
//               transition={{ type: "spring", duration: 0.5 }}
//             >
//               <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                   {initialData ? "Edit Course" : "Add New Course"}
//                 </h3>
//                 <button
//                   onClick={onClose}
//                   className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-5 p-5">
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Course Title
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       required
//                       className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//                       placeholder="Enter course title"
//                     />
//                   </div>
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Department
//                     </label>
//                     <input
//                       type="text"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       required
//                       className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//                       placeholder="Enter department name"
//                     />
//                   </div>
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Description
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       required
//                       rows={3}
//                       className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//                       placeholder="Enter course description"
//                     />
//                   </div>
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Intake (Number of Seats)
//                     </label>
//                     <input
//                       type="number"
//                       name="intake"
//                       value={formData.intake}
//                       onChange={handleChange}
//                       required
//                       min={1}
//                       className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//                       placeholder="Enter number of seats"
//                     />
//                   </div>
//                   <div>
//                     <div className="mb-2 flex items-center justify-between">
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Course Coordinators
//                       </label>
//                       <button
//                         type="button"
//                         onClick={addCoordinator}
//                         className="inline-flex items-center rounded-md bg-primary-light/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary-light/20 dark:bg-primary-dark/20 dark:text-primary-light"
//                       >
//                         <UserPlus className="mr-1 h-3.5 w-3.5" />
//                         Add Coordinator
//                       </button>
//                     </div>
//                     <div className="space-y-3">
//                       <AnimatePresence>
//                         {formData.coordinators.map((coordinator, index) => (
//                           <motion.div
//                             key={index}
//                             className="flex items-center gap-2"
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: -10 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <input
//                               type="text"
//                               value={coordinator}
//                               onChange={(e) =>
//                                 updateCoordinator(index, e.target.value)
//                               }
//                               className="flex-1 rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//                               placeholder={`Coordinator ${index + 1}`}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeCoordinator(index)}
//                               disabled={formData.coordinators.length <= 1}
//                               className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                           </motion.div>
//                         ))}
//                       </AnimatePresence>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none"
//                   >
//                     <Save className="mr-2 h-4 w-4" />
//                     {initialData ? "Update Course" : "Save Course"}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }
