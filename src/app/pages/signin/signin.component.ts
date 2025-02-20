import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

// Interface for response data
interface SigninResponse {
  success: boolean;
  token: string;
  data: { name: string; email: string };
  message: string;
}

@Component({
  selector: "app-signin",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  baseAPIUrl:string = environment['baseApi'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Define form with validators
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          // Custom email validator for valid email format
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to the email control in template
  get email() {
    return this.loginForm.get("email");
  }

  // On form submit
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null; // Reset error message

    const formData = this.loginForm.value;

    this.http.post<SigninResponse>(`${this.baseAPIUrl}/auth/signin`, formData).subscribe({
      next: (response) => {
        if (response.success) { 
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.data));
          this.router.navigate(["/movies"]);
        } else {
          this.errorMessage = response.message; // Store error message
          this.loading = false; // 🔹 Stop loading on failure
        }
      },
      error: (error) => {
        console.error("Login error:", error);
        this.errorMessage = error?.error?.message || "Login failed. Please try again.";
        this.loading = false; // 🔹 Stop loading on error
      },
      complete: () => {
        // ✅ Only set loading to false if success, otherwise it’s already set in error/else block
        if (this.errorMessage === null) {
          this.loading = false;
        }
      },
    });
  }
}
