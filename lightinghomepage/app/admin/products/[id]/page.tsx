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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Trash, Upload, Plus, X, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createProduct, updateProduct, deleteProduct } from "@/app/actions/product-actions"
import productsData from "@/data/products.json"
import categoriesData from "@/data/categories.json"
import applicationsData from "@/data/applications.json"

export default function ProductForm({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const isNewProduct = params.id === "new"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    main_image: "",
    images: ["", "", ""],
    certification_images: ["", "", ""],
    wattage: "",
    ip_rating: "",
    warranty: "",
    colour_temp: "",
    category_id: "",
    application_ids: [] as string[],
    additional_images: [] as { title: string; image: string }[],
    video_link: "",
    video_type: "",
    PDF_link: "",
  })

  useEffect(() => {
    if (!isNewProduct) {
      const existingProduct = productsData.find((p) => p.id === params.id)
      if (existingProduct) {
        setProduct({
          ...existingProduct,
          images: existingProduct.images || ["", "", ""],
          certification_images: existingProduct.certification_images || ["", "", ""],
          application_ids: existingProduct.application_ids || [],
          additional_images: existingProduct.additional_images || [],
        })
      }
    } else {
      // Generate a new ID for new products
      setProduct((prev) => ({
        ...prev,
        id: `prod${productsData.length + 1}`,
      }))
    }
  }, [params.id, isNewProduct])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplicationToggle = (applicationId: string) => {
    setProduct((prev) => {
      const applicationIds = [...prev.application_ids]

      if (applicationIds.includes(applicationId)) {
        return {
          ...prev,
          application_ids: applicationIds.filter((id) => id !== applicationId),
        }
      } else {
        return {
          ...prev,
          application_ids: [...applicationIds, applicationId],
        }
      }
    })
  }

  const handleAdditionalImageChange = (index: number, field: "title" | "image", value: string) => {
    setProduct((prev) => {
      const additionalImages = [...prev.additional_images]

      if (!additionalImages[index]) {
        additionalImages[index] = { title: "", image: "" }
      }

      additionalImages[index][field] = value

      return {
        ...prev,
        additional_images: additionalImages,
      }
    })
  }

  const addAdditionalImage = () => {
    setProduct((prev) => ({
      ...prev,
      additional_images: [...prev.additional_images, { title: "", image: "" }],
    }))
  }

  const removeAdditionalImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index),
    }))
  }

  const handleImageChange = (index: number, field: "images" | "certification_images", value: string) => {
    setProduct((prev) => {
      const images = [...prev[field]]
      images[index] = value

      return {
        ...prev,
        [field]: images,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Clean up empty values in arrays
      const cleanedProduct = {
        ...product,
        images: product.images.filter((img) => img.trim() !== ""),
        certification_images: product.certification_images.filter((img) => img.trim() !== ""),
        additional_images: product.additional_images.filter(
          (item) => item.title.trim() !== "" || item.image.trim() !== "",
        ),
      }

      let result

      if (isNewProduct) {
        result = await createProduct(cleanedProduct)
      } else {
        result = await updateProduct(cleanedProduct)
      }

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        router.push("/admin/products")
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
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      setIsDeleting(true)

      try {
        const result = await deleteProduct(product.id)

        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
          })
          router.push("/admin/products")
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
          <Button variant="ghost" onClick={() => router.push("/admin/products")} className="mr-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{isNewProduct ? "Add New Product" : `Edit Product: ${product.name}`}</h1>
        </div>

        <div className="flex gap-2">
          {!isNewProduct && (
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
                Save Product
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic">
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="additional">Additional Content</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>Basic information about the product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">Product ID</Label>
                    <Input
                      id="id"
                      name="id"
                      value={product.id}
                      onChange={handleChange}
                      disabled={!isNewProduct}
                      className={!isNewProduct ? "bg-gray-100" : ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select
                      value={product.category_id}
                      onValueChange={(value) => handleSelectChange("category_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                  <CardDescription>Technical details about the product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wattage">Wattage</Label>
                    <Input
                      id="wattage"
                      name="wattage"
                      value={product.wattage}
                      onChange={handleChange}
                      placeholder="e.g. 150W"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ip_rating">IP Rating</Label>
                    <Input
                      id="ip_rating"
                      name="ip_rating"
                      value={product.ip_rating}
                      onChange={handleChange}
                      placeholder="e.g. IP65"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="warranty">Warranty</Label>
                    <Input
                      id="warranty"
                      name="warranty"
                      value={product.warranty}
                      onChange={handleChange}
                      placeholder="e.g. 5 years"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="colour_temp">Color Temperature</Label>
                    <Input
                      id="colour_temp"
                      name="colour_temp"
                      value={product.colour_temp}
                      onChange={handleChange}
                      placeholder="e.g. 5000K"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Main Image</CardTitle>
                  <CardDescription>The primary product image</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative aspect-square max-w-[300px] border rounded-md overflow-hidden">
                      {product.main_image ? (
                        <Image
                          src={product.main_image || "/placeholder.svg"}
                          alt="Main product image"
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
                        value={product.main_image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Product Images</CardTitle>
                  <CardDescription>Show different angles of your product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.images.map((image, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="relative w-16 h-16 border rounded-md overflow-hidden flex-shrink-0">
                          {image ? (
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Product image ${index + 1}`}
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
                          onChange={(e) => handleImageChange(index, "images", e.target.value)}
                          placeholder="Enter image URL"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certification Images</CardTitle>
                  <CardDescription>Product certifications and badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.certification_images.map((image, index) => (
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
                          onChange={(e) => handleImageChange(index, "certification_images", e.target.value)}
                          placeholder="Enter certification image URL"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Product Applications</CardTitle>
                <CardDescription>Select the applications this product is suitable for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {applicationsData.map((application) => (
                    <div key={application.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`application-${application.id}`}
                        checked={product.application_ids.includes(application.id)}
                        onCheckedChange={() => handleApplicationToggle(application.id)}
                      />
                      <Label htmlFor={`application-${application.id}`}>{application.name}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="additional">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Features</CardTitle>
                  <CardDescription>Add images showcasing product features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.additional_images.map((item, index) => (
                      <div key={index} className="p-4 border rounded-md relative">
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full"
                          onClick={() => removeAdditionalImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`feature-title-${index}`}>Feature Title</Label>
                            <Input
                              id={`feature-title-${index}`}
                              value={item.title}
                              onChange={(e) => handleAdditionalImageChange(index, "title", e.target.value)}
                              placeholder="Enter feature title"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`feature-image-${index}`}>Feature Image URL</Label>
                            <Input
                              id={`feature-image-${index}`}
                              value={item.image}
                              onChange={(e) => handleAdditionalImageChange(index, "image", e.target.value)}
                              placeholder="Enter image URL"
                            />
                          </div>

                          {item.image && (
                            <div className="relative h-40 rounded-md overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addAdditionalImage} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature Image
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>Add video and PDF resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video_link">Video Link</Label>
                    <Input
                      id="video_link"
                      name="video_link"
                      value={product.video_link}
                      onChange={handleChange}
                      placeholder="Enter YouTube or Vimeo URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video_type">Video Type</Label>
                    <Select
                      value={product.video_type}
                      onValueChange={(value) => handleSelectChange("video_type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select video type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="vimeo">Vimeo</SelectItem>
                        <SelectItem value="mp4">MP4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="PDF_link">PDF Link</Label>
                    <Input
                      id="PDF_link"
                      name="PDF_link"
                      value={product.PDF_link}
                      onChange={handleChange}
                      placeholder="Enter PDF URL"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}

