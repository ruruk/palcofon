"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save, Trash, Upload, Loader2 } from "lucide-react"
import { createApplication, updateApplication, deleteApplication } from "@/app/actions/application-actions"
import applicationsData from "@/data/applications.json"
import productsData from "@/data/products.json"

export default function ApplicationForm({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const isNewApplication = params.id === "new"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [application, setApplication] = useState({
    id: "",
    name: "",
    subname: "",
    main_image: "",
    certification_images: ["", ""],
    description: "",
    product_ids: [] as string[],
    PDF_link: "",
  })

  useEffect(() => {
    if (!isNewApplication) {
      const existingApplication = applicationsData.find((app) => app.id === params.id)
      if (existingApplication) {
        setApplication({
          ...existingApplication,
          certification_images: existingApplication.certification_images || ["", ""],
          product_ids: existingApplication.product_ids || [],
        })
      }
    } else {
      // Generate a new ID for new applications
      setApplication((prev) => ({
        ...prev,
        id: `app${applicationsData.length + 1}`,
      }))
    }
  }, [params.id, isNewApplication])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApplication((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductToggle = (productId: string) => {
    setApplication((prev) => {
      const productIds = [...prev.product_ids]

      if (productIds.includes(productId)) {
        return {
          ...prev,
          product_ids: productIds.filter((id) => id !== productId),
        }
      } else {
        return {
          ...prev,
          product_ids: [...productIds, productId],
        }
      }
    })
  }

  const handleImageChange = (index: number, value: string) => {
    setApplication((prev) => {
      const certImages = [...prev.certification_images]
      certImages[index] = value

      return {
        ...prev,
        certification_images: certImages,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Clean up empty values in arrays
      const cleanedApplication = {
        ...application,
        certification_images: application.certification_images.filter((img) => img.trim() !== ""),
      }

      let result

      if (isNewApplication) {
        result = await createApplication(cleanedApplication)
      } else {
        result = await updateApplication(cleanedApplication)
      }

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        router.push("/admin/applications")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      setIsDeleting(true)

      try {
        const result = await deleteApplication(application.id)

        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
          })
          router.push("/admin/applications")
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/admin/applications")} className="mr-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {isNewApplication ? "Add New Application" : `Edit Application: ${application.name}`}
          </h1>
        </div>

        <div className="flex gap-2">
          {!isNewApplication && (
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          )}
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Application
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>Basic information about the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">Application ID</Label>
                <Input
                  id="id"
                  name="id"
                  value={application.id}
                  onChange={handleChange}
                  disabled={!isNewApplication}
                  className={!isNewApplication ? "bg-gray-100" : ""}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Application Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={application.name}
                  onChange={handleChange}
                  placeholder="Enter application name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subname">Subname / Tagline</Label>
                <Input
                  id="subname"
                  name="subname"
                  value={application.subname}
                  onChange={handleChange}
                  placeholder="Enter application subname"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={application.description}
                  onChange={handleChange}
                  placeholder="Enter application description"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="PDF_link">PDF Link</Label>
                <Input
                  id="PDF_link"
                  name="PDF_link"
                  value={application.PDF_link}
                  onChange={handleChange}
                  placeholder="Enter PDF URL"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Main Image</CardTitle>
                <CardDescription>The primary application image</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative aspect-video max-w-full border rounded-md overflow-hidden">
                    {application.main_image ? (
                      <Image
                        src={application.main_image || "/placeholder.svg"}
                        alt="Main application image"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <Upload className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="main_image">Image URL</Label>
                    <Input
                      id="main_image"
                      name="main_image"
                      value={application.main_image}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certification Images</CardTitle>
                <CardDescription>Application certifications and badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.certification_images.map((image, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 border rounded-md overflow-hidden flex-shrink-0">
                        {image ? (
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Certification image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-100">
                            <Upload className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <Input
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="Enter certification image URL"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Related Products</CardTitle>
              <CardDescription>Select products related to this application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {productsData.map((product) => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`product-${product.id}`}
                      checked={application.product_ids.includes(product.id)}
                      onCheckedChange={() => handleProductToggle(product.id)}
                    />
                    <Label htmlFor={`product-${product.id}`}>{product.name}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

