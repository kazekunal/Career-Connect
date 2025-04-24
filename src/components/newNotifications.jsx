// src/components/NewJobNotification.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, BellRing } from "lucide-react";

export function NewJobNotification({ jobListings }) {
  const [showNotification, setShowNotification] = useState(false);
  const [newJobDetails, setNewJobDetails] = useState(null);
  const prevJobIdsRef = useRef(new Set());
  const isInitialMount = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // --- ADD THIS CHECK ---
    // Ensure jobListings is an array before proceeding.
    // If it's undefined or null, skip the rest of the effect for this render.
    if (!Array.isArray(jobListings)) {
        // Optionally log a warning for debugging, but prevent the error
        // console.warn("NewJobNotification received non-array jobListings:", jobListings);
        return;
    }
    // --- END CHECK ---

    const currentJobIds = new Set(jobListings.map(job => job.id)); // Now this line is safe

    if (isInitialMount.current) {
      prevJobIdsRef.current = currentJobIds;
      isInitialMount.current = false;
      return;
    }

    let newlyAddedJob = null;
    // Use a standard for...of loop which is safe even if jobListings is empty
    for (const job of jobListings) {
        // Ensure job and job.id exist before accessing .has (though Set handles undefined/null keys)
      if (job && job.id && !prevJobIdsRef.current.has(job.id)) {
        newlyAddedJob = job;
        break;
      }
    }

    if (newlyAddedJob) {
      // Make sure newlyAddedJob has the properties before accessing them
      setNewJobDetails({
        title: newlyAddedJob.title || "N/A",
        company: newlyAddedJob.company || "N/A",
      });
      setShowNotification(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShowNotification(false);
        setNewJobDetails(null);
      }, 5000);
    }

    prevJobIdsRef.current = currentJobIds;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [jobListings]); // Dependency array remains the same

  const handleClose = () => {
    setShowNotification(false);
    setNewJobDetails(null);
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
  };

  // No changes needed in the return/JSX part for this specific error
  if (!showNotification || !newJobDetails) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <Card className="shadow-lg border-blue-500 bg-white">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
               <BellRing className="h-5 w-5 text-blue-600" />
               <div>
                  <p className="text-sm font-medium text-gray-800">New Job Posted!</p>
                  <p className="text-xs text-gray-600">
                    {newJobDetails.title} at {newJobDetails.company}
                  </p>
               </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-800"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close notification</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Optional but good practice: Define prop types if you're using PropTypes
// import PropTypes from 'prop-types';
// NewJobNotification.propTypes = {
//   jobListings: PropTypes.arrayOf(PropTypes.object) // Expect an array of objects
// };
// NewJobNotification.defaultProps = {
//   jobListings: [] // Provide a default empty array
// };