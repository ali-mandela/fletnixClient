import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

// Interface for response data
interface SignupResponse {
  success: boolean;
  token: string;
  data: { name: string; email: string };
  message: string;
}

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
    baseAPIUrl:string = environment['baseApi'];
  

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Define form with validators
    this.signupForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          // Custom email validator for complete email format (e.g., text@mail.com)
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      age: ["", [Validators.required, Validators.min(12)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to the email control in template
  get email() {
    return this.signupForm.get("email");
  }

  // On form submit
  async onSubmit(): Promise<void> {
    if (this.signupForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;
    const formData = this.signupForm.value;

    this.http.post<SignupResponse>(`${this.baseAPIUrl}/auth/signup`, formData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log("Signup successful:", response);  
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.data));

          this.router.navigate(["/movies"]);
        } else {
          this.errorMessage = response.message;
          this.loading = false;
        }
      },
      error: (error) => {
        console.error("Signup error:", error);
        this.errorMessage = error?.error?.message || "Signup failed. Please try again.";
        this.loading = false;
      },
      complete: () => {
        if (this.errorMessage === null) {
          this.loading = false;
        }
      },
    });
  }
}
