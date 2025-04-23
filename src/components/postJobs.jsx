"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function JobPostingForm({ updateParentJobs, initialJobData, onSubmitSuccess }) {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    eligibility: '',
    salary: '',
    deadline: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Load jobs from localStorage on component mount
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobPostings');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  // Set form data if initialJobData is provided (edit mode)
  useEffect(() => {
    if (initialJobData) {
      setFormData(initialJobData);
    } else {
      // Reset form when not in edit mode
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        eligibility: '',
        salary: '',
        deadline: ''
      });
    }
  }, [initialJobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Job title is required';
    if (!formData.company.trim()) errors.company = 'Company name is required';
    if (!formData.description.trim()) errors.description = 'Job description is required';
    if (!formData.eligibility.trim()) errors.eligibility = 'Eligibility criteria is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    let updatedJobs;
    let newJobCreated = false;
    let jobId;
    
    if (initialJobData) {
      // Update existing job
      jobId = initialJobData.id;
      updatedJobs = jobs.map(job => 
        job.id === initialJobData.id ? { ...formData, id: initialJobData.id } : job
      );
    } else {
      // Add new job
      jobId = Date.now();
      const newJob = {
        ...formData,
        id: jobId,
        postedDate: new Date().toISOString()
      };
      updatedJobs = [...jobs, newJob];
      newJobCreated = true;
    }
    
    // Update local state and localStorage
    setJobs(updatedJobs);
    localStorage.setItem('jobPostings', JSON.stringify(updatedJobs));
    
    // Initialize applicants array for new job
    if (newJobCreated) {
      const allApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '{}');
      if (!allApplicants[jobId]) {
        allApplicants[jobId] = [];
        localStorage.setItem('jobApplicants', JSON.stringify(allApplicants));
      }
    }
    
    // Update parent component's jobs state
    if (updateParentJobs) {
      updateParentJobs(updatedJobs);
    }
    
    // Call success callback to close dialog
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Job Title *
          </label>
          <input
            className={`w-full rounded-md border border-input px-3 py-2 text-sm ${
              formErrors.title ? 'border-red-500' : ''
            }`}
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Senior Software Engineer"
          />
          {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="company">
            Company Name *
          </label>
          <input
            className={`w-full rounded-md border border-input px-3 py-2 text-sm ${
              formErrors.company ? 'border-red-500' : ''
            }`}
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Acme Inc."
          />
          {formErrors.company && <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="location">
          Location
        </label>
        <input
          className="w-full rounded-md border border-input px-3 py-2 text-sm"
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. San Francisco, CA (Remote OK)"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Job Description *
        </label>
        <textarea
          className={`w-full rounded-md border border-input px-3 py-2 text-sm h-32 ${
            formErrors.description ? 'border-red-500' : ''
          }`}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide a detailed description of the job..."
        ></textarea>
        {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="eligibility">
          Eligibility Criteria *
        </label>
        <textarea
          className={`w-full rounded-md border border-input px-3 py-2 text-sm h-24 ${
            formErrors.eligibility ? 'border-red-500' : ''
          }`}
          id="eligibility"
          name="eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          placeholder="List required qualifications, experience, skills, etc."
        ></textarea>
        {formErrors.eligibility && <p className="text-red-500 text-xs mt-1">{formErrors.eligibility}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="salary">
            Salary Range
          </label>
          <input
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            id="salary"
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. $80,000 - $120,000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="deadline">
            Application Deadline
          </label>
          <input
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            id="deadline"
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-4 pt-4">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
        >
          {initialJobData ? 'Update Job' : 'Post Job'}
        </Button>
      </div>
    </form>
  );
}