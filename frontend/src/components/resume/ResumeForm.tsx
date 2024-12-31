import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { templatesApi } from "../../services/api";
import { DynamicFieldArray } from "./DynamicFieldArray";
import { useForm } from "react-hook-form";
import { ResumeData } from "../../schemas/resumeSchema";

export const ResumeForm = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const { register, handleSubmit, control } = useForm<ResumeData>();

  const { data: templates, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => templatesApi.getTemplates()
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <form className="space-y-6">
      {/* Contenu du formulaire */}
    </form>
  );
}; 